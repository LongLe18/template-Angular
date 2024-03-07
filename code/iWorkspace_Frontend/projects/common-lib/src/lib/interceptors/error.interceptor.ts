import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { formatMessage } from "devextreme/localization";
import notify from 'devextreme/ui/notify';

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {
  formatMessage = formatMessage;

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Lỗi xuất hiện:', error.error);
      notify({
        message: `${formatMessage('request-error')}`,
        position: { at: 'top center', my: 'top center' },
        width: 400,
      },
      'error');
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      notify({
        message: `${formatMessage('request-error-2')} ${error.error.message}`,
        position: { at: 'top center', my: 'top center' },
        width: 400,
      },
      'error');
    }
    // return throwError(() => new Error(formatMessage('request-error')));
    return throwError(() => error)
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError(this.handleError))
  }
}
