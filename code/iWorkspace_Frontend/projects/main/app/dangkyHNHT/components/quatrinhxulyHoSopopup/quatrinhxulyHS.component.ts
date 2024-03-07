import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output, ViewChild} from '@angular/core';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import {PopupModule, PopupComponent} from '../popup-component/popup.component';

import {
  TranslatePipeModule,
} from 'projects/common-lib/src/public-api';
import { DxDataGridModule, DxTabPanelModule } from 'devextreme-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'quatrinhxulyHoSo-popup',
  templateUrl: './quatrinhxulyHS.component.html',
  styleUrls: ['./quatrinhxulyHS.component.scss'],
  providers: []
})
export class QuaTrinhXuLyHoSoComponent {

    @ViewChild(PopupComponent, { static: true }) formPopup;

    @Input() visible = false;

    @Input() data: any;

    @Input() dataVersion: any;
    
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
  ],
  declarations: [QuaTrinhXuLyHoSoComponent],
  exports: [QuaTrinhXuLyHoSoComponent],
})
export class QuaTrinhXuLyHoSoModule { }