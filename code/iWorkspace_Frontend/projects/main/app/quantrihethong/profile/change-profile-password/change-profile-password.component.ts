import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output, ViewChild} from '@angular/core';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import {FormPopupComponent, FormPopupModule} from './form-popup/form-popup.component';
import notify from 'devextreme/ui/notify';

import {
  AuthService,
  PasswordTextBoxComponent,
  PasswordTextBoxModule,
  TranslatePipeModule,
} from 'projects/common-lib/src/public-api';

import { ValidationRule } from 'devextreme-angular/common';

@Component({
  selector: 'change-profile-password',
  templateUrl: './change-profile-password.component.html',
  styleUrls: ['./change-profile-password.component.scss'],
  providers: [AuthService]
})
export class ChangeProfilePasswordFormComponent {
  @ViewChild(FormPopupComponent, { static: true }) formPopup;

  @ViewChild('confirmField', { static: true }) confirmField: PasswordTextBoxComponent;

  @Input() visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();

  isSaveDisabled = true;

  formData: Record<string, any> = {};

  confirmPasswordValidators: ValidationRule[] = [
    {
      type: 'compare',
      message: 'Passwords do not match',
      comparisonTarget: () => this.formData.password,
    },
  ];
  
  constructor(private service: AuthService) {}

  async onFieldChanged() {
    const formValues = Object.entries(this.formData);

    this.isSaveDisabled =  await (formValues.length != 3 || !!formValues.find(([_, value]) => !value) || !this.formPopup.isValid());
  }

  saveNewPassword(): void {
    console.log(this.formData)
    this.service.changePassword(this.formData['currentPassword'], this.formData['password']); 
    notify({ message: 'Password Changed', position: {at: 'bottom center', my: 'bottom center'}}, 'success');
  }

  checkConfirm(): void {
    this.confirmField.revalidate();
  }

  onNewPasswordChanged() {
    this.checkConfirm();
    this.onFieldChanged();
  }

  changeVisible(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxFormModule,
    DxLoadIndicatorModule,
    PasswordTextBoxModule,
    FormPopupModule,
    TranslatePipeModule,
  ],
  declarations: [ChangeProfilePasswordFormComponent],
  exports: [ChangeProfilePasswordFormComponent],
})
export class ChangeProfilePasswordFormModule { }