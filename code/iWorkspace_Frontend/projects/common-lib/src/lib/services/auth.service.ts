import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { formatMessage } from 'devextreme/localization';
import { CommonConst } from 'projects/common-lib/src/public-api';
import { SESSION_STORAGE } from "projects/common-lib/src/public-api";
import { IUser } from 'projects/common-lib/src/public-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'projects/main/environments/environment';
import { Observable } from 'rxjs';

// export const defaultUser: IUser = {
//   email: 'admin@gmail.com',
//   name: 'John Heart',
//   avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
//   password: 'password',
// };

@Injectable()
export class AuthService {
  formatMessage = formatMessage;

  private _httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private _user: IUser | null = window.sessionStorage.getItem(SESSION_STORAGE.USER_KEY) ?
    JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE.USER_KEY)) : null;

  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = CommonConst.TOCHUC;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'auth/signin',
      {
        username,
        password,
      },
      this._httpOptions
    );
  }

  getUser() {
    const user = window.sessionStorage.getItem(SESSION_STORAGE.USER_KEY);
    if (user) {
      return {
        isOk: true,
        data: JSON.parse(user),
      };
    }
    return {
      isOk: false,
      data: null,
    };
  }

  saveUser(user: IUser): void {
    this._user = user;
    window.sessionStorage.removeItem(SESSION_STORAGE.USER_KEY);
    window.sessionStorage.setItem(SESSION_STORAGE.USER_KEY, JSON.stringify(user));
    this.router.navigate([this._lastAuthenticatedPath]); // redirect when login successfully
  }

  createAccount(username: string, email: string, password: string, roles: Array<string>, httpOptions?: any): Observable<any> {
    if (httpOptions) this._httpOptions = httpOptions;
    return this.http.post(environment.apiUrl + 'auth/signup',
      {
        username,
        email,
        password,
        role: roles
      }, httpOptions );
  }

  async changePassword(oldPassword: string, newPassword: string, recoveryCode?: string, ) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  logOut(httpOptions?: any): Observable<any> {
    if (httpOptions) this._httpOptions = httpOptions;
    return this.http.post(environment.apiUrl + 'auth/signout', { }, httpOptions);
  }

  refreshToken(token: string, httpOptions?: any) {
    if (httpOptions) this._httpOptions = httpOptions;
    return this.http.post(environment.apiUrl + 'auth/refreshtoken', { refreshToken:token }, this._httpOptions);
  }

  clean(): void {
    window.sessionStorage.clear();
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || CommonConst.DEFAULT_PATH);

    if (!isLoggedIn) {
      this.router.navigate([CommonConst.DEFAULT_PATH]);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || CommonConst.TOCHUC;
    }

    return isLoggedIn || isAuthForm;
  }
}
