import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { AuthService, ThemeService, CommonConst, IResponse, TranslatePipeModule, ScreenService } from 'projects/common-lib/src/public-api';
import { PasswordTextBoxModule } from 'projects/common-lib/src/lib/components';

@Component({
  selector: 'app-login',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() resetLink = CommonConst.KHOIPHUC_MATKHAU;

  @Input() createAccountLink = CommonConst.DANGKY;

  defaultAuthData: IResponse;

  btnStylingMode: string;

  isPasswordMode = true;

  loading = false;

  formData: any = {};

  password: string = '';

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService,
    public screen: ScreenService) {
      this.themeService.isDark.subscribe((value: boolean) => {
        this.btnStylingMode = value ? 'outlined' : 'contained';
      });
  }

  onChangPassword = (e: string) => {
    this.password = e;
  }

  switchMode = () => {
    this.isPasswordMode = !this.isPasswordMode;
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { username } = this.formData;
    this.loading = true;

    this.authService.logIn(username, this.password).subscribe({
      next: data => {
        this.loading = false;
        this.authService.saveUser(data);
      },
      error: err => {
        this.loading = false;
        console.log(err);
      }
    });

  }

  onCreateAccountClick = () => {
    this.router.navigate([this.createAccountLink]);
  };

  async ngOnInit(): Promise<void> {
    this.defaultAuthData = await this.authService.getUser();
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxButtonModule,
    PasswordTextBoxModule,
    TranslatePipeModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule { }
