import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxFormComponent,
    DxScrollViewModule, DxToolbarModule, DxFormModule, DxNumberBoxModule, DxDropDownBoxModule, DxTagBoxModule } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ApplyPipeModule, CommonConst, Menu, MenuService, Notify, TranslatePipeModule,
  CornerButtonModule, 
  VaiTroService,
  BreadCrumbModule} from 'projects/common-lib/src/public-api';
import { forkJoin } from 'rxjs';
@Component({
    templateUrl: './themmoi.component.html',
    styleUrls: ['./themmoi.component.scss'],
    providers: [MenuService, VaiTroService],
})
export class ThemmoiMenuComponent {

  assign = Object.assign;

  formatMessage = formatMessage;

  isLoading = false;

  parentFunctionEditorOptions: Object;

  vaiTroOptions: Object;

  roleData: Object[] = [
    {
      "ID": 1,
      "name": "Vai trò 1",
    },
    {
      "ID": 2,
      "name": "Vai trò 2",
    },
  ];

  listCornerBtn: any[] = [];

  readonly linkBreadCrumb = CommonConst.THEM_MENU;

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: MenuService, private vaiTroService: VaiTroService) {
    forkJoin([
        this.vaiTroService.LayDSVaiTro()
    ]).subscribe(([dsVaiTro]) => {
      this.parentFunctionEditorOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenChucNang", dataSource: this.service.DanhMucCha,
        placeholder: formatMessage('choose')
      };

      this.vaiTroOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenVaiTro", 
        hideSelectedItems: true,
        dataSource: dsVaiTro.data,
        placeholder: formatMessage('choose')
      };
    })
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
      const data: Menu = {
        tenChucNang: this.formData.instance.getEditor('tenChucNang').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        chucNangCha: this.formData.instance.getEditor('chucNangCha').option('value'),
        vaiTro: this.formData.instance.getEditor('vaiTro').option('value'), 
        url: this.formData.instance.getEditor('url').option('value'),
      }
      /// call API
      this.service.ThemMenu(data).subscribe({
        next: (data: Menu) => {
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
    this.router.navigate([CommonConst.MENU])
  }
  
  onSaveAndClose = () => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: Menu = {
        tenChucNang: this.formData.instance.getEditor('tenChucNang').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        chucNangCha: this.formData.instance.getEditor('chucNangCha').option('value'),
        url: this.formData.instance.getEditor('url').option('value'),
        vaiTro: this.formData.instance.getEditor('vaiTro').option('value'),
      }
      /// call API
      this.service.ThemMenu(data).subscribe({
        next: (data: Menu) => {
          this.isLoading = false;
          this.formData.instance.resetValues();
          Notify(formatMessage('add-message'), 'success', 1000);
          this.router.navigate([CommonConst.MENU]); // redirect parent page
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
        DxDropDownBoxModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxScrollViewModule,
        DxToolbarModule,
        DxFormModule,
        DxNumberBoxModule,
        DxTagBoxModule,
        CornerButtonModule,
        BreadCrumbModule,
        
        TranslatePipeModule,
        ApplyPipeModule
    ],
    providers: [],
    exports: [],
    declarations: [ThemmoiMenuComponent],
})
export class ThemmoiMenuModule { }
