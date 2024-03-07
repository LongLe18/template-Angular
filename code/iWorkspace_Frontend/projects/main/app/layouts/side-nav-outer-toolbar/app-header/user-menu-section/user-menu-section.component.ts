import { Component, NgModule, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule, DxListTypes } from 'devextreme-angular/ui/list';
import { IUser } from 'projects/common-lib/src/public-api';

@Component({
  selector: 'user-menu-section',
  templateUrl: 'user-menu-section.component.html',
  styleUrls: ['./user-menu-section.component.scss'],
})

export class UserMenuSectionComponent {
  @Input()
  menuItems: any;

  @Input()
  showAvatar!: boolean;

  @Input()
  user!: IUser | null;

  @ViewChild('userInfoList', { read: ElementRef }) userInfoList: ElementRef<HTMLElement>;

  constructor() {}

  handleListItemClick(e: DxListTypes.ItemClickEvent) {
    e.itemData?.onClick();
  }
}

@NgModule({
  imports: [
    DxListModule,
    CommonModule,
  ],
  declarations: [UserMenuSectionComponent],
  exports: [UserMenuSectionComponent],
})
export class UserMenuSectionModule { }
