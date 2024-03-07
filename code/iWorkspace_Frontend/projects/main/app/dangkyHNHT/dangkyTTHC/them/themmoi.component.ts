import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent, } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ThuTucHC, ThuTucHCService, CommonConst, Notify, LinhVucService, 
  ThuTucService, NhanSuService, NhanSu, ToChucService, DonViDongTCService, 
  DiaDiemService, dataLoaiTienTe, dataLoaiDonVi, CongngheTCService } from 'projects/common-lib/src/public-api';
import { forkJoin } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';

@Component({
    templateUrl: './themmoi.component.html',
    styleUrls: ['./themmoi.component.scss'],
    providers: [ThuTucHCService, ThuTucService, LinhVucService, NhanSuService, ToChucService,
      DonViDongTCService, DiaDiemService, CongngheTCService],
})
export class ThemmoiDangKyTTHCComponent {

  assign = Object.assign;

  isLoading = false;

  readonly linkBreadCrumb = CommonConst.THEM_DANGKYTTHC;

  linhVucEditorOptions: Object;

  toChucEditorOptions: Object;

  thuTucEditorOptions: Object;

  congNgheEditorOptions: Object;

  diadiemEditorOptions: Object;
  
  isOnline: boolean = false;

  loaiHoiThaoEditorOptions: Object = {
    searchEnabled: true, valueExpr: "guid",
    displayExpr: "tenLoai", dataSource: [{
      tenLoai: "Trực tiếp",
      guid: "1"
    }, {
      tenLoai: "Trực tuyến",
      guid: "2"
    }, {
      tenLoai: "Kết hợp",
      guid: "3"
    }],
    placeholder: formatMessage('choose'),
    onValueChanged: (e) => {
      if (e.value === '2') this.isOnline = true;
      else this.isOnline = false;
    }
  };

  selectBoxDataCoQuan: any[] = [];

  dataNhanSu: NhanSu[];
  
  coOrganizationItems: Record<string, any>[] = this.getCoOrganizationItems();

  ingredientsItems: Record<string, any>[] = this.getIngredientsItems();

  sponsorItems: Record<string, any>[] = this.getSponsorsItems();

  infoReporterItems: Record<string, any>[] = this.getInfoReporterItems();

  attachDocumentItems: Record<string, any>[] = this.getAttachDocumentItems();

  isForwardPopupOpened = false;

  listCornerBtn: any[] = [];
  
  readonly bieuMau = [
    {
      guid: "1",
      tenHoSo: "Công văn xin phép tổ chức hội nghị hội thảo, quốc tế",
      file: {
        label: '2C/TCTW-98.docx',
        url: "assets/images/avatar.jpg"
      },
      fileUpload: '',
      isDeleted: false, // Không được xóa
      isDisabled: true, // Không được  chỉnh sửa
    }, {
      guid: "2",
      tenHoSo: "Đề án",
      file: {
        url: "assets/images/avatar.jpg",
        label: 'HS02-VN/BNV.docx',
      },
      fileUpload: '',
      isDisabled: true, // Không được  chỉnh sửa
      isDeleted: false, // Không được xóa
    }
  ] 

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: ThuTucHCService, private nhanSuSerVice: NhanSuService,
    private linhVucService: LinhVucService, private thuTucService: ThuTucService, private toChucService: ToChucService,
    private donViDongTCService: DonViDongTCService, private diaDiemService: DiaDiemService,
    private congNgheService: CongngheTCService
  ) {
    forkJoin([
      this.linhVucService.LayDSLinhVuc(),
      this.thuTucService.LayDSThuTucHC(),
      this.toChucService.LayDSToChuc(),
      this.diaDiemService.LayDSDiaDiem(),
      this.congNgheService.LayDSCongngheTC(),
    ]).subscribe(([dslinhVuc, dsthuTuc, dsToChuc, dsdiaDiem, dsCongNghe]) => {
      this.linhVucEditorOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenLinhVuc", dataSource: dslinhVuc.data,
        placeholder: formatMessage('choose')
      };

      this.diadiemEditorOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenDiaDiem", dataSource: dsdiaDiem.data,
        placeholder: formatMessage('choose')
      };

      this.toChucEditorOptions = { 
        searchEnabled: false, valueExpr: "guid",
        displayExpr: "tenDonVi", dataSource: dsToChuc.data,
        placeholder: formatMessage('choose')
      };

      this.thuTucEditorOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenThuTuc", 
        dataSource: dsthuTuc.data,
        placeholder: formatMessage('choose')
      };

      this.congNgheEditorOptions = { 
        searchEnabled: true, valueExpr: "guid",
        displayExpr: "tenCongNghe", 
        dataSource: dsCongNghe.data,
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

    this.donViDongTCService.LayDSDonViDongTC().subscribe({
      next: (data: any) => {
        const donViDongTC = {
          data: new ArrayStore({
            data: data.data,
            key: "guid"
          }),
          dataField: 'donViID',
          valueExpr: 'guid',
          displayExpr:'tenDonVi',
        };
        const loaiTienTe = {
          data: new ArrayStore({
            data: dataLoaiTienTe,
            key: "loaiTienTeID"
          }),
          dataField: 'loaiTienTeID',
          valueExpr: 'loaiTienTeID',
          displayExpr:'loaiTienTe',
        };
        const loaiDonVi = {
          data: new ArrayStore({
            data: dataLoaiDonVi,
            key: "loaiDonViID"
          }),
          dataField: 'loaiDonViID',
          valueExpr: 'loaiDonViID',
          displayExpr:'loaiDonVi',
        };
        this.selectBoxDataCoQuan.push(donViDongTC, loaiTienTe, loaiDonVi);
      },
      error: err => {
        console.log(err);
      }
    });

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
        onClick: () => this.onSave(false)
      },
      {
        label: formatMessage('save&close'),
        icon: 'save',
        type: 'default',
        onClick: () => this.onSave(true)
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

  getCoOrganizationItems(){
    return [
      { dataField: 'donViID', caption: formatMessage('nameunit'), cellTemplate: 'SelectBoxEditor'},
      { dataField: 'loaiDonViID', caption: formatMessage('typeunit'), cellTemplate: 'TextEditor', disabled: true},
      { dataField: 'quocGia', caption: formatMessage('nation'), cellTemplate: 'TextEditor', disabled: true },
    ]
  }

  getIngredientsItems(){
    return [
      { dataField: 'hoVaTen', caption: formatMessage('fullname'), cellTemplate: 'TextEditor'},
      { dataField: 'chucVu', caption: formatMessage('chucvu'), cellTemplate: 'TextEditor'},
    ]
  }

  getSponsorsItems(){
    return [
      { dataField: 'tenCoQuan', caption: formatMessage('namesponsor'), cellTemplate: 'TextEditor'},
      { dataField: 'giaTri', caption: formatMessage('sponsorValue'), cellTemplate: 'NumberEditor'},
      { dataField: 'loaiTienTeID', caption: formatMessage('typeCurrency'), cellTemplate: 'SelectBoxEditor'},
      { dataField: 'loaiDonViID', caption: formatMessage('typeUnit'), cellTemplate: 'SelectBoxEditor'},
    ]
  }

  getAttachDocumentItems(){
    return [
      { dataField: 'tenHoSo', caption: formatMessage('nameDocument'), cellTemplate: 'TextEditor', disabled: true, width: 450},
      { dataField: 'file', caption: formatMessage('downloadform'), cellTemplate: 'Downloader', width: 200},
      { dataField: 'fileUpload', caption: formatMessage('attachDocument'), cellTemplate: 'FileUploader' },
    ]
  }

  getInfoReporterItems(){
    return [
      { dataField: 'hoVaTen', caption: formatMessage('fullname'), cellTemplate: 'TextEditor'},
      { dataField: 'ngaySinh', caption: formatMessage('birthday'), cellTemplate: 'DateBoxEditor'},
      { dataField: 'quocTich', caption: formatMessage('nationality'), cellTemplate: 'TextEditor'},
      { dataField: 'hoChieu', caption: formatMessage('numberpassport'), cellTemplate: 'TextEditor'},
      { dataField: 'ngheNghiep', caption: formatMessage('jobandatjob'), cellTemplate: 'TextEditor'},
      { dataField: 'file', caption: formatMessage('attachFile'), cellTemplate: 'FileUploader'},
    ]
  }
  
  onUploadFileChanged(e) {
    const element = e.element as HTMLElement;
    const childElement = element.getElementsByClassName('dx-fileuploader-upload-button');
    for (let i = 0; i <= childElement.length; i++) {
        childElement[0].parentNode.removeChild(childElement[0])
    }
  }

  onSave = (redirect: boolean = false) => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: ThuTucHC = {
        tenHoiThao: this.formData.instance.getEditor('tenHoiThao').option('value'),
        lyDoMucDich: {
          lyDo: this.formData.instance.getEditor('lydo').option('value'),
          mucDich: this.formData.instance.getEditor('mucDich').option('value'),
          donViID: this.formData.instance.getEditor('donViID').option('value'),
        },
        linhVucID: this.formData.instance.getEditor('linhVucID').option('value'),
        thuTucID: this.formData.instance.getEditor('thuTucID').option('value'),
        tieuDe: this.formData.instance.getEditor('tieuDe').option('value'),
        // hồ sơ đính kèm
      }
      /// call API
      this.service.ThemThuTucHC(data).subscribe({
        next: (data: ThuTucHC) => {
          this.isLoading = false;
          this.formData.instance.resetValues();
          Notify(formatMessage('add-message'), 'success', 1000);
          if (redirect) this.router.navigate([CommonConst.DANGKYTTHC]); // redirect parent page
        },
        error: err => {
          this.isLoading = false;
          console.log(err);
        }
      })
    }
  }

  onClose = () => {
    this.router.navigate([CommonConst.DANGKYTTHC])
  }

  openForwardPopup = () => {
    this.isForwardPopupOpened = true;
  };

  onForward = () => {

  }
}
