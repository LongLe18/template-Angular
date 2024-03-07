import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ThuTucHC, ThuTucHCService, 
  CommonConst, Notify, LinhVucService, ThuTucService, NhanSuService, 
  NhanSu, DonViDongTCService, DiaDiemService, ToChucService, dataLoaiTienTe, 
  dataLoaiDonVi } from 'projects/common-lib/src/public-api';
import { Subject, forkJoin, map, switchMap, takeUntil } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';

@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [ThuTucHCService, ThuTucService, LinhVucService, NhanSuService,
      DonViDongTCService, DiaDiemService, ToChucService],
})
export class CapNhatDangKyTTHCComponent {

  destroy$: Subject<void> = new Subject<void>();

  assign = Object.assign;

  isLoading = false;

  linkBreadCrumb = CommonConst.SUA_DANGKYTTHC;

  guid: string;

  data: any;

  linhVucEditorOptions: Object;

  toChucEditorOptions: Object;

  thuTucEditorOptions: Object;

  diadiemEditorOptions: Object;

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
    placeholder: formatMessage('choose')
  };

  selectBoxDataCoQuan: any[] = [];

  dataNhanSu: NhanSu[];
  
  coOrganizationItems: Record<string, any>[] = this.getCoOrganizationItems();

  ingredientsItems: Record<string, any>[] = this.getIngredientsItems();

  sponsorItems: Record<string, any>[] = this.getSponsorsItems();

  infoReporterItems: Record<string, any>[] = this.getInfoReporterItems();

  attachDocumentItems: Record<string, any>[] = this.getAttachDocumentItems();

  listCornerBtn: any[] = [];

  isForwardPopupOpened = false;

  bieuMau = [];

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: ThuTucHCService, private nhanSuSerVice: NhanSuService,
    private linhVucService: LinhVucService, private thuTucService: ThuTucService,
    private route: ActivatedRoute, private toChucService: ToChucService,
    private donViDongTCService: DonViDongTCService, private diaDiemService: DiaDiemService) {
    forkJoin([
      this.linhVucService.LayDSLinhVuc(),
      this.thuTucService.LayDSThuTucHC(),
      this.toChucService.LayDSToChuc(),
      this.diaDiemService.LayDSDiaDiem()
    ]).subscribe(([dslinhVuc, dsthuTuc, dsToChuc, dsdiaDiem]) => {
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
          dataField: 'guid',
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
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('guid')),
      switchMap(guid => {
        this.guid = guid;
        this.linkBreadCrumb += `/${guid}`;
        return this.service.LayThuTucHC(this.guid);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: ThuTucHC) => {
        this.data = data;
        this.data.hoSoKemTheo.forEach((item) => {
          const newBieuMau = {
            guid: item.guid,
            tenHoSo: item.tenHoSo,
            file: {
              label: item.file.label,
              url: item.file.url
            },
            fileUpload: item.fileUpload === undefined && '',
            isDeleted: false, // Không được xóa
            isDisabled: true, // Không được  chỉnh sửa
          }
          this.bieuMau.push(newBieuMau)
        })
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
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

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to complete any observables subscribed with takeUntil
    this.destroy$.complete(); // Complete the subject to release resources
  }

  refresh = () => {
    this.isLoading = true;
    this.formData.instance.resetValues();
    this.isLoading = false;
  }

  getCoOrganizationItems(){
    return [
      { dataField: 'guid', caption: formatMessage('nameunit'), cellTemplate: 'SelectBoxEditor'},
      { dataField: 'loaiDonVi', caption: formatMessage('typeunit'), cellTemplate: 'TextEditor', disabled: true},
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

  getAttachDocumentItems(){
    return [
      { dataField: 'tenHoSo', caption: formatMessage('nameDocument'), cellTemplate: 'TextEditor', disabled: true, width: 450 },
      { dataField: 'file', caption: formatMessage('downloadform'), cellTemplate: 'Downloader', width: 200},
      { dataField: 'fileUpload', caption: formatMessage('attachDocument'), cellTemplate: 'FileUploader' },
    ]
  }

  onSave = (redirect: boolean = false) => {
    this.isLoading = true;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: ThuTucHC = {
        linhVucID: this.formData.instance.getEditor('linhVucID').option('value'),
        thuTucID: this.formData.instance.getEditor('thuTucID').option('value'),
        tieuDe: this.formData.instance.getEditor('tieuDe').option('value'),
        // hồ sơ đính kèm
      }
      /// call API
      this.service.CapNhatThuTucHC(this.guid, data).subscribe({
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
