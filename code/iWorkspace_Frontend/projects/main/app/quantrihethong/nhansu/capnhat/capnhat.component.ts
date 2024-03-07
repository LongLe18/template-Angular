import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxFormComponent, } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import {  NhanSu, NhanSuService, 
  CommonConst, Notify, TrinhDoService,
  CoQuanFormComponent, VaiTroService, VaiTro, 
  ToChucService, ChucVuService, reverseMappingTrangThai } from 'projects/common-lib/src/public-api';
import { Subject, forkJoin, map, of, switchMap, takeUntil } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';
@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [NhanSuService, TrinhDoService, VaiTroService, ToChucService, ChucVuService],
})
export class CapNhatNhanSuComponent {

  @ViewChild(CoQuanFormComponent, { static: false }) CoQuanForm: CoQuanFormComponent;

  destroy$: Subject<void> = new Subject<void>();

  assign = Object.assign;

  formatMessage = formatMessage;

  isLoading = false;

  guid: string;

  data: any;

  linkBreadCrumb = CommonConst.SUA_NHANSU;

  listCornerBtn: any[] = [];

  gioiTinhOptions: Object;

  statusEditorOptions: Object;

  trinhDoOptions: Object;

  vaiTroOptions: Object;

  OrganizationAndPositionItems: Record<string, any>[] = this.getOrganizationAndPositionItems();

  selectBoxDataCoQuan: any[] = [];

  sampleQuyen = [{
    "ID": '1',
    "Name": "Đại học Quốc gia -> Đại học tự nhiên",
  }, {
    "ID": '2',
    "Name": "Đại học Quốc gia -> Đại học ngoại ngữ",
  }]

  isPermission: boolean = false; // vai trò có quyền hay không
  havePermission: boolean = true; // đã check box quyền hay chưa

  permission: string[];

  maskSDT = '(+84)000-000-000';

  hasParameter: boolean = false;

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: NhanSuService, private vaiTroService: VaiTroService,
      private trinhDoService: TrinhDoService, private route: ActivatedRoute,
      private toChucService: ToChucService, private chucVuService: ChucVuService) {
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

    this.statusEditorOptions = { 
      searchEnabled: true, valueExpr: "value",
      displayExpr: "label", 
      dataSource: [
        {
          label: "Hoạt động",
          value: 1,
        },
        {
          label: "Đã dừng",
          value: 2
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
        onValueChanged: this.onVaiTroChanged
      };
    })

    forkJoin([
      this.toChucService.LayDSToChuc(),
      this.chucVuService.LayDSChucVu()
    ]).subscribe(([dsToChuc, dsChucVu]) => {
      const organizatonData = {
        data: new ArrayStore({
          data: dsToChuc.data,
          key: "guid"
        }),
        dataField: 'donViID',
        valueExpr: 'guid',
        displayExpr:'tenDonVi',
      };
      const positionData = {
        data: new ArrayStore({
          data: dsChucVu.data,
          key: "guid"
        }),
        dataField: 'chucVuID',
        valueExpr: 'guid',
        displayExpr:'tenChucVu',
      };

      this.selectBoxDataCoQuan.push(organizatonData, positionData);
    })
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('guid')),
      switchMap(guid => {
        if (guid !== null) {
          this.guid = guid;
          this.linkBreadCrumb += `/${guid}`;
          this.hasParameter = true;
          return this.service.LayNhanSu(this.guid);
        } else {
          this.hasParameter = false;
          this.linkBreadCrumb = CommonConst.THEM_CHUCVU;
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: NhanSu) => {
        if (this.hasParameter) {
          this.data = data;
          this.data.trangThai = reverseMappingTrangThai(this.data.trangThai);
          this.permission = data.quyenXuLy;
          data.vaiTroID.forEach(idVaiTro => {
            this.vaiTroService.LayVaiTro(idVaiTro).subscribe({
              next: (data: VaiTro) => {
                for (const menuRole of data.menuRole) {
                  if (menuRole.idRole.includes('8') || menuRole.idRole.includes('9') || menuRole.idRole.includes('10')) {
                    this.isPermission = true;
                    this.havePermission = false;
                    break;
                  } else {
                    this.isPermission = false;
                    break;
                  }
                }
              },
              error: ({message}) => console.log(message)
            })
          })
        }
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
        onClick: () => this.onSave(false)
      },
    ]
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to complete any observables subscribed with takeUntil
    this.destroy$.complete(); // Complete the subject to release resources
  }

  getOrganizationAndPositionItems(){
    return [
      { dataField: 'donViID', caption: formatMessage('nameunit'), cellTemplate: 'SelectBoxEditor' },
      { dataField: 'chucVuID', caption: formatMessage('chucvu'), cellTemplate: 'SelectBoxEditor' },
    ]
  }

  onVaiTroChanged = (e) => {
    // Check vai trò được chọn có quyền xử lý thủ tục HNHT (hard code quyền của hệ thống. Ví dụ: 8, 9 , 10)
    if (e.value.length === 0) {
      this.isPermission = false;
      return;
    }

    e.value.forEach(idVaiTro => {
      this.vaiTroService.LayVaiTro(idVaiTro).subscribe({
        next: (data: VaiTro) => {
          for (const menuRole of data.menuRole) {
            if (menuRole.idRole.includes('8') || menuRole.idRole.includes('9') || menuRole.idRole.includes('10')) {
              this.isPermission = true; 
              break;
            } else {
              this.isPermission = false;
              break;
            }
          }
        },
        error: ({message}) => console.log(message)
      })
    })
  }
  
  onHavePermission = (e) => {
    if (e.value) {
      this.havePermission = false;
    } else {
      this.havePermission = true;
    }
  }
  
  onPermissionChanged = (e) => {
    this.permission = e.value;
  }

  refresh = () => {
    this.isLoading = true;
    this.formData.instance.resetValues();
    this.isLoading = false;
  }

  onSave = (redirect: boolean = false) => {
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: NhanSu = {
        tenDangNhap: this.formData.instance.getEditor('tenDangNhap').option('value'),
        hoVaTen: this.formData.instance.getEditor('hoVaTen').option('value'),
        email: this.formData.instance.getEditor('email').option('value'),
        gioiTinh: this.formData.instance.getEditor('gioiTinh').option('value'),
        ngaySinh: this.formData.instance.getEditor('ngaySinh').option('value'),
        sdt: this.formData.instance.getEditor('sdt').option('value'),
        trinhDo: this.formData.instance.getEditor('trinhDo').option('value'),
        trinhDoID: this.formData.instance.getEditor('trinhDoID').option('value'),
        vaiTroID: this.formData.instance.getEditor('vaiTroID').option('value'),
        coQuan: this.CoQuanForm.data, // lấy từ thành phần con
        quyenXuLy: this.permission,
        trangThai: this.formData.instance.getEditor('trangThai').option('value') // Không cho cập nhật trạng thái
      }
      
      /// call API
      if (this.hasParameter) {
        this.service.CapNhatNhanSu(this.guid, data).subscribe({
          next: (data: NhanSu) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.NHANSU]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      } else {
        this.service.ThemNhanSu(data).subscribe({
          next: (data: NhanSu) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.NHANSU]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      }
    }
  }

  onClose = () => {
    this.router.navigate([CommonConst.NHANSU])
  }
}

