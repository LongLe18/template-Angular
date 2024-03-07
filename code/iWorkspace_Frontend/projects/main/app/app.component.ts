import { Component, HostBinding, OnDestroy, OnInit, } from '@angular/core';
import { AppInfoService, AuthService, EventBusService, ScreenService,
  ThemeService, TranslationService } from 'projects/common-lib/src/public-api';
import { locale, loadMessages } from 'devextreme/localization';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TranslationService],
})
export class AppComponent implements OnDestroy, OnInit {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService,
    private themeService: ThemeService,
    private screen: ScreenService,
    public appInfo: AppInfoService,
    private TranslationService: TranslationService,
    private eventBusService: EventBusService
  ) {
    this.locale = this.TranslationService.getCurrentLanguage();
    themeService.setAppTheme();
    this.initMessages();
    locale(this.locale);
  }

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  locale: string;

  eventBusSub?: Subscription;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn;

    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.roles = user.data.roles;

      this.showAdminBoard = this.roles.includes('QuanTriHeThong');
      this.showModeratorBoard = this.roles.includes('QuanTriDonVi');

      this.username = user.data.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logOut().subscribe({
      next: res => {
        this.authService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  initMessages() {
    loadMessages(this.TranslationService.getDictionary());
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}
