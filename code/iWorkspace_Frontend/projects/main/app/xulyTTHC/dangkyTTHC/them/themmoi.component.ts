import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ThuTucHCDungChung, ThuTucHCDungChungService, 
  CommonConst, Notify, LinhVucService, ThuTucService, NhanSuService, NhanSu } from 'projects/common-lib/src/public-api';
import { forkJoin } from 'rxjs';

@Component({
    templateUrl: './themmoi.component.html',
    styleUrls: ['./themmoi.component.scss'],
    providers: [ThuTucHCDungChungService, ThuTucService, LinhVucService, NhanSuService],
})
export class ThemmoiDangKyTTHCDungChungComponent {

  assign = Object.assign;

  isLoading = false;

  readonly linkBreadCrumb = CommonConst.THEM_DANGKYTTHC_DUNGCHUNG;

  linhVucEditorOptions: Object;

  thuTucEditorOptions: Object;

  dataNhanSu: NhanSu[];
  
  attachDocumentItems: Record<string, any>[] = this.getAttachDocumentItems();

  isForwardPopupOpened = false;

  listCornerBtn: any[] = [];

  readonly bieuMau = [
    {
      guid: "1",
      tenHoSo: "Sơ yếu lý lịch",
      file: {
        label: '2C/TCTW-98.docx',
        url: "assets/images/avatar.jpg"
      },
      fileUpload: '',
      isDeleted: false, // Không được xóa
      isDisabled: true, // Không được  chỉnh sửa
    }, {
      guid: "2",
      tenHoSo: "Sơ yếu lý lịch viên chức",
      file: {
        url: "assets/images/avatar.jpg",
        label: 'HS02-VN/BNV.docx',
      },
      fileUpload: '',
      isDisabled: true, // Không được xóa
      isDeleted: false, // Không được  chỉnh sửa
    }, {
      guid: "3",
      tenHoSo: "Phiếu bổ sung lý lịch viên chức",
      file: {
        label: 'HS03-VC/BNV.docx',
        url: "assets/images/avatar.jpg"
      },
      fileUpload: '',
      isDeleted: false, // Không được xóa
      isDisabled: true, // Không được chỉnh sửa
    }
  ] 

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: ThuTucHCDungChungService, private nhanSuSerVice: NhanSuService,
    private linhVucService: LinhVucService, private thuTucService: ThuTucService) {
    forkJoin([
      this.linhVucService.LayDSLinhVuc(),
      this.thuTucService.LayDSThuTucHC()
    ]).subscribe(([dslinhVuc, dsthuTuc]) => {
      this.linhVucEditorOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenLinhVuc", dataSource: dslinhVuc.data,
        placeholder: formatMessage('choose')
      };

      this.thuTucEditorOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenThuTuc", 
        dataSource: dsthuTuc.data,
        placeholder: formatMessage('choose')
      };
    })

    this.nhanSuSerVice.LayDSNhanSu().subscribe({
      next: (data: any) => {
        this.dataNhanSu = data.data;
      },
      error: err => {
        console.log(err);
      }
    });
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
        onClick:  () => this.onSave(false)
      },
      {
        label: formatMessage('save&close'),
        icon: 'save',
        type: 'default',
        onClick:  () => this.onSave(true)
      },
      {
        label: formatMessage('forward'),
        icon: 'email',
        type: 'default',
        onClick: this.openForwardPopup
      },
    ]
  }

  refresh = () => {
    this.isLoading = true;
    this.formData.instance.resetValues();
    this.isLoading = false;
  }

  getAttachDocumentItems(){
    return [
      { dataField: 'tenHoSo', caption: formatMessage('nameDocument'), cellTemplate: 'TextEditor', disabled: true, width: 450},
      { dataField: 'file', caption: formatMessage('downloadform'), cellTemplate: 'Downloader', width: 250},
      { dataField: 'fileUpload', caption: formatMessage('attachDocument'), cellTemplate: 'FileUploader' },
    ]
  }

  onSave = (redirect: boolean = false) => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: ThuTucHCDungChung = {
        linhVucID: this.formData.instance.getEditor('linhVucID').option('value'),
        thuTucID: this.formData.instance.getEditor('thuTucID').option('value'),
        tieuDe: this.formData.instance.getEditor('tieuDe').option('value'),
        // hồ sơ đính kèm
      }
      /// call API
      this.service.ThemThuTucHCDungChung(data).subscribe({
        next: (data: ThuTucHCDungChung) => {
          this.isLoading = false;
          this.formData.instance.resetValues();
          Notify(formatMessage('add-message'), 'success', 1000);
          if (redirect) this.router.navigate([CommonConst.DANGKYTTHC_DUNGCHUNG]); // redirect parent page
        },
        error: err => {
          this.isLoading = false;
          console.log(err);
        }
      })
    }
  }

  onClose = () => {
    this.router.navigate([CommonConst.DANGKYTTHC_DUNGCHUNG])
  }
  openForwardPopup = () => {
    this.isForwardPopupOpened = true;
  };

  onForward = () => {

  }
}
