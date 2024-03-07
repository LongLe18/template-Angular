import { Injectable } from "@angular/core";
import { SESSION_STORAGE } from "projects/common-lib/src/public-api";

@Injectable({ providedIn: "root" })
export class JwtService {
  getToken(): string {
    return window.sessionStorage[SESSION_STORAGE.ACCESS_TOKEN];
  }

  saveToken(token: string): void {
    window.localStorage[SESSION_STORAGE.ACCESS_TOKEN] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem(SESSION_STORAGE.ACCESS_TOKEN);
  }
}
