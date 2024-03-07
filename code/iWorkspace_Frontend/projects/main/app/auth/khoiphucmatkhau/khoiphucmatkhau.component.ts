import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { Notify, IResponse, TranslatePipeModule, AuthService } from 'projects/common-lib/src/public-api';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

@Component({
  selector: 'reset-password',
  templateUrl: './khoiphucmatkhau.component.html',
  styleUrls: ['./khoiphucmatkhau.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Input() signInLink = '/auth/login';

  @Input() buttonLink = '/auth/login';

  defaultAuthData: IResponse;

  loading = false;

  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.resetPassword(email);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate([this.buttonLink]);
      Notify(notificationText, 'success', 2500);
    } else {
      Notify(result.message, 'error', 2000);
    }
  }

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
    TranslatePipeModule,
  ],
  declarations: [ResetPasswordComponent],
  exports: [ResetPasswordComponent],
})
export class ResetPasswordModule { }
