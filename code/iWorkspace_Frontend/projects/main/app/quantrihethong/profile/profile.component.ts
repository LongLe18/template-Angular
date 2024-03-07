import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxFormComponent,
    DxScrollViewModule, DxToolbarModule, DxFormModule, DxTextAreaModule, DxNumberBoxModule, DxDateBoxModule, DxTagBoxModule } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ApplyPipeModule, NhanSu, NhanSuService, 
  CommonConst, CornerButtonModule, Notify, TranslatePipeModule, TrinhDoService, CoQuanFormModule, CoQuanFormComponent, VaiTroService, AuthService, ScreenService, BreadCrumbModule } from 'projects/common-lib/src/public-api';
import { FormAvatarModule } from 'projects/common-lib/src/lib/components/avatar-form/avatar-form.component';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangeProfilePasswordFormModule } from './change-profile-password/change-profile-password.component';
@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [NhanSuService, TrinhDoService, VaiTroService, AuthService],
})
export class ProfileComponent {

  @ViewChild(CoQuanFormComponent, { static: false }) CoQuanForm: CoQuanFormComponent;

  assign = Object.assign;

  formatMessage = formatMessage;

  isLoading = false;

  data: any;

  listCornerBtn: any[] = [];

  gioiTinhOptions: Object;

  trinhDoOptions: Object;

  vaiTroOptions: Object;

  readonly linkBreadCrumb = CommonConst.PROFILE;

  maskSDT = '(+84)000-000-000';
  
  sampleQuyen = [{
    "ID": '1',
    "Name": "Đại học Quốc gia -> Đại học tự nhiên",
  }, {
    "ID": '2',
    "Name": "Đại học Quốc gia -> Đại học ngoại ngữ",
  }]

  permission: string[];

  OrganizationAndPositionItems: Record<string, any>[] = this.getOrganizationAndPositionItems();

  isChangePasswordPopupOpened = false;


  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: NhanSuService,
      private trinhDoService: TrinhDoService, private vaiTroService: VaiTroService,
      private authService: AuthService, public screen: ScreenService) {
    this.gioiTinhOptions = { 
      valueExpr: "value",
      displayExpr: "label", 
      dataSource: [
        {
          label: "Nam",
          value: true,
        },
        {
          label: "Nữ",
          value: false
        }
      ],
       placeholder: formatMessage('choose')
    };
    
    forkJoin([
      this.trinhDoService.LayDSTrinhDo(),
        this.vaiTroService.LayDSVaiTro()
    ]).subscribe(([dsTrinhDo, dsVaiTro]) => {
      this.trinhDoOptions = { 
        searchEnabled: true, valueExpr: "maTrinhDo",
        displayExpr: "ten", 
        dataSource: dsTrinhDo.data,
        placeholder: formatMessage('choose')
      };

      this.vaiTroOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenVaiTro", 
        hideSelectedItems: true,
        dataSource: dsVaiTro.data,
        placeholder: formatMessage('choose'),
      };
    })
  }

  ngOnInit(): void {
    this.isLoading = false;
    const user = this.authService.getUser();
    this.data = user.data;

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
  
  getOrganizationAndPositionItems(){
    return [
      { dataField: 'donViID', caption: formatMessage('nameunit'), cellTemplate: 'SelectBoxEditor' },
      { dataField: 'chucVuID', caption: formatMessage('chucvu'), cellTemplate: 'SelectBoxEditor' },
    ]
  }

  changePassword() {
    this.isChangePasswordPopupOpened = true;
  };

  refresh = () => {
    this.isLoading = true;
    this.formData.instance.resetValues();
    this.isLoading = false;
  }

  onSave = () => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: NhanSu = {
        hoVaTen: this.formData.instance.getEditor('hoVaTen').option('value'),
        email: this.formData.instance.getEditor('email').option('value'),
        gioiTinh: this.formData.instance.getEditor('gioiTinh').option('value'),
        ngaySinh: this.formData.instance.getEditor('ngaySinh').option('value'),
        sdt: this.formData.instance.getEditor('sdt').option('value'),
        trinhDoID: this.formData.instance.getEditor('trinhDoID').option('value'),
      }
      
      /// call API
      this.service.CapNhatNhanSu(this.data.guid, data).subscribe({
        next: (data: NhanSu) => {
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
    this.router.navigate([CommonConst.NHANSU])
  }
  
  onSaveAndClose = () => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: NhanSu = {
        hoVaTen: this.formData.instance.getEditor('hoVaTen').option('value'),
        email: this.formData.instance.getEditor('email').option('value'),
        gioiTinh: this.formData.instance.getEditor('gioiTinh').option('value'),
        ngaySinh: this.formData.instance.getEditor('ngaySinh').option('value'),
        sdt: this.formData.instance.getEditor('sdt').option('value'),
        trinhDoID: this.formData.instance.getEditor('trinhDoID').option('value'),
      }
      /// call API
      this.service.CapNhatNhanSu(this.data.guid, data).subscribe({
        next: (data: NhanSu) => {
          this.isLoading = false;
          this.formData.instance.resetValues();
          Notify(formatMessage('add-message'), 'success', 1000);
          this.router.navigate([CommonConst.NHANSU]); // redirect parent page
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
        DxDateBoxModule,
        DxTextBoxModule,
        DxScrollViewModule,
        DxToolbarModule,
        DxFormModule,
        DxNumberBoxModule,
        FormAvatarModule,
        CornerButtonModule,
        DxButtonModule,
        CoQuanFormModule,
        DxTagBoxModule,
        CommonModule,
        ChangeProfilePasswordFormModule,
        BreadCrumbModule,

        TranslatePipeModule,
        ApplyPipeModule
    ],
    providers: [],
    exports: [],
    declarations: [ProfileComponent],
})
export class ProfileModule { }
