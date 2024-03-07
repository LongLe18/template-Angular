import {
    Component, Input, NgModule,
  } from '@angular/core';
  import { CommonModule, DatePipe } from '@angular/common';
  import { DxButtonModule, DxDropDownButtonModule } from 'devextreme-angular';
  import { CommonConst, ThemeService, ThongBao, TranslatePipeModule } from 'projects/common-lib/src/public-api';
import { Router } from '@angular/router';
import { DxListModule, DxListTypes } from 'devextreme-angular/ui/list';
  
  @Component({
    selector: 'notification-dropdown',
    templateUrl: 'notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

    @Input() items: ThongBao[];

    constructor(public themeService: ThemeService, private router: Router) {
    }
    
    viewAll() {
        this.router.navigate([CommonConst.THONGBAO]);
        document.getElementsByClassName('dx-overlay-wrapper dx-popup-wrapper dx-dropdowneditor-overlay dx-dropdownbutton-popup-wrapper')[0].remove();
    }

    handleListItemClick(e: DxListTypes.ItemClickEvent) {
        // e.itemData?.onClick();
        this.router.navigate([CommonConst.THONGBAO]);
        document.getElementsByClassName('dx-overlay-wrapper dx-popup-wrapper dx-dropdowneditor-overlay dx-dropdownbutton-popup-wrapper')[0].remove();
    }
}
  
@NgModule({
    imports: [
        CommonModule, 
        DxDropDownButtonModule,
        DxButtonModule,
        DxListModule,
        TranslatePipeModule,
        DatePipe,
    ],
    declarations: [NotificationComponent],
    exports: [NotificationComponent],
})
export class NotificationModule { }
  