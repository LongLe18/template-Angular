import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'HỆ THỐNG QUẢN LÝ THỦ TỤC HÀNH CHÍNH ĐẠI HỌC QUỐC GIA';
  }

  public get logo() {
    return 'assets/icons/logo.svg';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
