import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output, ViewChild} from '@angular/core';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import {PopupModule, PopupComponent} from '../popup-component/popup.component';

import {
    NhanSu,
  TranslatePipeModule,
} from 'projects/common-lib/src/public-api';
import { DxCheckBoxModule, DxDataGridModule, DxTabPanelModule } from 'devextreme-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'chuyentiep-popup',
  templateUrl: './chuyentiep.component.html',
  styleUrls: ['./chuyentiep.component.scss'],
  providers: []
})
export class ChuyenTiepComponent {

    @ViewChild(PopupComponent, { static: true }) formPopup;

    @Input() visible = false;

    @Input() forWard = {
        visible: false,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onHandle: () => {}
    };

    @Input() data: NhanSu[];

    @Output() visibleChange = new EventEmitter<boolean>();

    constructor(private router: Router) {}

    changeVisible(visible: boolean): void {
        this.visible = visible;
        this.visibleChange.emit(this.visible);
    }
    
    onViewClick(e: any) {
        e.event.preventDefault();
        // redirect 
        // this.router.navigate([CommonConst.SUA_DANGKYTTHC, e.row.data.guid]);
    }
}

@NgModule({
  imports: [
    CommonModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    PopupModule,
    TranslatePipeModule,
    DxTabPanelModule,
    DxCheckBoxModule,
  ],
  declarations: [ChuyenTiepComponent],
  exports: [ChuyenTiepComponent],
})
export class ChuyenTiepModule { }