import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TokenInterceptor, HttpRequestInterceptor, ErrorInterceptor,
  AuthService, ScreenService, AppInfoService, ThemeService } from "projects/common-lib/src/public-api";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule, UnauthenticatedContentModule } from './layouts';
import { ResetPasswordModule } from './auth/khoiphucmatkhau/khoiphucmatkhau.component';
import { ChangePasswordModule } from './auth/doimatkhau/doimatkhau.component';
import { CreateAccountModule } from './auth/dangky/dangky.component';
import { LoginModule } from './auth/dangnhap/dangnhap.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    ResetPasswordModule,
    CreateAccountModule,
    ChangePasswordModule,
    LoginModule,
    UnauthenticatedContentModule,

    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService, ThemeService, CurrencyPipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
