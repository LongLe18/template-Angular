import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { IResponse, Notify, CommonConst, TranslatePipeModule, AuthService } from 'projects/common-lib/src/public-api';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  @Input() redirectLink = CommonConst.DEFAULT_PATH;
  @Input() buttonLink = CommonConst.DEFAULT_PATH;
  loading = false;

  defaultAuthData: IResponse;

  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { username, email, password } = this.formData;
    this.loading = true;
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: "response" }

    // sample role ROLE_USER
    this.authService.createAccount(username, email, password, ["ROLE_USER"], headers).subscribe({
      next: (data: HttpResponse<any>) => {
        console.log(data);
        if (data.status === 201) {
          Notify(data.body.message, "error", 200)
        } else {

          this.router.navigate([this.buttonLink]);
        }
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
  }

  confirmPassword = (e: ValidationCallbackData) => e.value === this.formData.password;

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
  declarations: [CreateAccountComponent],
  exports: [CreateAccountComponent],
})
export class CreateAccountModule { }
