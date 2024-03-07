import {
  Component, NgModule, Input, Output, EventEmitter, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { UserPanelModule } from './user-panel/user-panel.component';
import { LanguagesMenuModule } from './languages-menu/languages-menu.component';
// import { ThemeSwitcherModule } from './theme-switcher/theme-switcher.component';
import { Router } from '@angular/router';
import { IUser, Locale, TranslatePipeModule, SESSION_STORAGE, CommonConst, 
  AuthService, TranslationService, ScreenService, ThongBaoService, filterDTO, ThongBao } from 'projects/common-lib/src/public-api';
import { Subscription } from 'rxjs';
import { NotificationModule } from './notification-dropdown/notification.component';
import { formatMessage } from 'devextreme/localization';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  providers: [ThongBaoService]
})

export class AppHeaderComponent implements OnInit {

  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  @Input()
  logo!: string;

  user: IUser | null = { email: '' };

  notificationsItems: ThongBao[];

  userMenuItems = [
  {
    text: formatMessage('profile'),
    icon: 'user',
    onClick: () => {
      this.router.navigate([CommonConst.PROFILE]);
      document.getElementsByClassName('dx-overlay-wrapper dx-popup-wrapper dx-dropdowneditor-overlay dx-dropdownbutton-popup-wrapper')[0].remove(); 
    },
  },
  {
    text: formatMessage('notification'),
    icon: 'belloutline',
    onClick: () => {
      this.router.navigate([CommonConst.THONGBAO]);
      document.getElementsByClassName('dx-overlay-wrapper dx-popup-wrapper dx-dropdowneditor-overlay dx-dropdownbutton-popup-wrapper')[0].remove(); 
    },
  },
  {
    text: 'Đăng xuất',
    icon: 'runner',
    onClick: () => {
      window.sessionStorage.removeItem(SESSION_STORAGE.USER_KEY);
      this.authService.saveUser(null);
      this.router.navigate([CommonConst.DEFAULT_PATH]);
      /// api logout error
      // this.authService.logOut().subscribe({
      //   next: data => {
      //     window.sessionStorage.removeItem(SESSION_STORAGE.USER_KEY);
      //     this.authService.saveUser(null);
      //     this.router.navigate([CommonConst.DEFAULT_PATH]);
      //   },
      //   error: err => {
      //     console.log(err)
      //   }
      // });
    },
  }];

  locales: Locale[];

  constructor(private authService: AuthService, private thongBaoService: ThongBaoService,
    private router: Router, private screen: ScreenService,
    private TranslationService: TranslationService) {
      this.locales = TranslationService.getLocales();
      this.thongBaoService.LayDSThongBao().subscribe({
        next: (data: filterDTO<ThongBao>) => {
          this.notificationsItems = data.data;
        }, 
        error: ({message}) => console.log(message)
      })
  }

  ngOnInit() {
    this.user = this.authService.getUser().data;
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  };
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxToolbarModule,
    NotificationModule,
    // ThemeSwitcherModule,
    UserPanelModule,
    LanguagesMenuModule,
    TranslatePipeModule,
  ],
  declarations: [AppHeaderComponent],
  exports: [AppHeaderComponent],
})
export class AppHeaderModule { }
