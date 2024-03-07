import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from "../services";
import { SESSION_STORAGE, EventData, EventBusService } from "projects/common-lib/src/public-api";

@Injectable({ providedIn: "root" })
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.loggedIn) {
      const token = this.authService.getUser().data.accessToken;
      if (token != null) {
        req = this.addTokenHeader(req, token);
      }
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.authService.loggedIn) {
        const token = this.authService.getUser().data.refreshToken;
        return this.authService.refreshToken(token).pipe(
          switchMap((data: any) => {
            this.isRefreshing = false;
            this.authService.saveUser(data);
            this.refreshTokenSubject.next(data.accessToken);
            return next.handle(this.addTokenHeader(request, data.accessToken));
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.eventBusService.emit(new EventData('logout', null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    return request.clone({ headers: request.headers.set(SESSION_STORAGE.TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}
