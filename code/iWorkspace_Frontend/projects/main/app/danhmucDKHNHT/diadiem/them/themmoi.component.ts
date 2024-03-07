import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxFormComponent,
    DxScrollViewModule, DxToolbarModule, DxFormModule, DxTextAreaModule, DxNumberBoxModule, DxDateBoxModule } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ApplyPipeModule, DiaDiem, DiaDiemService, 
  CommonConst, CornerButtonModule, Notify, TranslatePipeModule, BreadCrumbModule } from 'projects/common-lib/src/public-api';
@Component({
    templateUrl: './themmoi.component.html',
    styleUrls: ['./themmoi.component.scss'],
    providers: [DiaDiemService],
})
export class ThemmoiDiaDiemComponent {

  assign = Object.assign;

  isLoading = false;

  readonly linkBreadCrumb = CommonConst.THEM_DIADIEM;

  trinhTrangOptions: Object;

  listCornerBtn: any[] = [];

  data: DiaDiem = {tinhTrangID: 1, thuTu: null};

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: DiaDiemService) {
    this.trinhTrangOptions = { 
      valueExpr: "guid",
      displayExpr: "label", 
      dataSource: this.service.tinhTrang,
      placeholder: formatMessage('choose')
    };
  }

  ngOnInit(): void {
    this.listCornerBtn = [
      {
        label: formatMessage('Close'),
        icon: 'close',
        type: 'normal',
        onClick: this.onClose
      },
      {
        label: formatMessage('dxDataGrid-editingSaveRowChanges'),
        icon: 'save',
        type: 'default',
        onClick: this.onSave
      },
      {
        label: formatMessage('save&close'),
        icon: 'save',
        type: 'default',
        onClick: this.onSaveAndClose
      },
    ]
  }
  
  refresh = () => {
    this.isLoading = true;
    this.formData.instance.resetValues();
    this.isLoading = false;
  }

  onSave = () => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: DiaDiem = {
        tenDiaDiem: this.formData.instance.getEditor('tenDiaDiem').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        tinhTrangID: this.formData.instance.getEditor('tinhTrangID').option('value'),
      }
      /// call API
      this.service.ThemDiaDiem(data).subscribe({
        next: (data: DiaDiem) => {
          this.isLoading = false;
          this.formData.instance.resetValues();
          Notify(formatMessage('add-message'), 'success', 1000);
        },
        error: err => {
          this.isLoading = false;
          console.log(err);
        }
      })
    }
  }

  onClose = () => {
    this.router.navigate([CommonConst.DIADIEM])
  }
  
  onSaveAndClose = () => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: DiaDiem = {
        tenDiaDiem: this.formData.instance.getEditor('tenDiaDiem').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        tinhTrangID: this.formData.instance.getEditor('tinhTrangID').option('value'),
      }
      /// call API
      this.service.ThemDiaDiem(data).subscribe({
        next: (data: DiaDiem) => {
          this.isLoading = false;
          this.formData.instance.resetValues();
          Notify(formatMessage('add-message'), 'success', 1000);
          this.router.navigate([CommonConst.DIADIEM]); // redirect parent page
        },
        error: err => {
          this.isLoading = false;
          console.log(err);
        }
      })
    }
  }
}

@NgModule({
    imports: [
        DxButtonModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxScrollViewModule,
        DxToolbarModule,
        DxFormModule,
        DxTextAreaModule,
        DxNumberBoxModule,
        CornerButtonModule,
        BreadCrumbModule,
        DxDateBoxModule,
        
        TranslatePipeModule,
        ApplyPipeModule
    ],
    providers: [],
    exports: [],
    declarations: [ThemmoiDiaDiemComponent],
})
export class ThemmoiDiaDiemModule { }
