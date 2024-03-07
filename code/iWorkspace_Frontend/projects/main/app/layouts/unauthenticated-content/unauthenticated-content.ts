import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingleCardModule } from './header/header.component';
import { Router } from '@angular/router';
import { formatMessage } from 'devextreme/localization';

@Component({
  selector: 'app-unauthenticated-content',
  template: `
    <app-single-card [title]="title" [description]="description" [logo]="logo">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `],
})
export class UnauthenticatedContentComponent {
  formatMessage = formatMessage;

  constructor(private router: Router) { }

  get description() {
    const path = this.router.url.split('/').at(-1);
    switch (path) {
      case 'khoiphuc-matkhau': return formatMessage('resetpassword-message');
      default: return '';
    }
  }

  get logo() {
    return 'assets/images/u18.png';
  }

  get title() {
    // sample render title giao dien xac thuc
    const path = this.router.url.split('/').at(-1);
    switch (path) {
      // case 'dangnhap': return formatMessage('signin');
      // case 'khoiphuc-matkhau': return formatMessage('resetpassword');
      // case 'dangky': return formatMessage('signup');
      // case 'doimatkhau': return formatMessage('changePassword');
      default: return '';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SingleCardModule,
  ],
  declarations: [UnauthenticatedContentComponent],
  exports: [UnauthenticatedContentComponent],
})
export class UnauthenticatedContentModule { }
