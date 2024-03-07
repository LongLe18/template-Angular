import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { NhanSu, ThuTucService, LinhVucService, ToChucService, 
  CommonConst, Notify, CoQuanFormComponent, ThuTucHanhChinh, ThuTucHC, reverseMappingTrangThai } from 'projects/common-lib/src/public-api';
import { Subject, forkJoin, map, of, switchMap, takeUntil } from 'rxjs';

@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [ThuTucService, LinhVucService, ToChucService],
})
export class CapNhatThuTucHCComponent {
  
  destroy$: Subject<void> = new Subject<void>();

  @ViewChild(CoQuanFormComponent, { static: false }) CoQuanForm: CoQuanFormComponent;

  assign = Object.assign;

  formatMessage = formatMessage;

  isLoading = false;

  guid: string;

  data: any;

  listCornerBtn: any[] = [];

  linkBreadCrumb = CommonConst.SUA_THUTUCHC;

  linhVucEditorOptions: Object;

  coQuanEditorOptions: Object;

  typeProcedureEditorOptions: Object;

  processProcedureEditorOptions: Object;

  AttachDocumentItems: Record<string, any>[] = this.getAttachDocuments();

  hasParameter: boolean = false;

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: ThuTucService, private linhVucService: LinhVucService, 
    private toChucService: ToChucService, private route: ActivatedRoute) {
      forkJoin([
        this.toChucService.LayDSToChuc(),
        this.linhVucService.LayDSLinhVuc()
      ]).subscribe(([dsToChuc, dsLinhVuc]) => {
        this.linhVucEditorOptions = { 
          valueExpr: "guid",
          displayExpr: "tenLinhVuc", dataSource: dsLinhVuc.data,
          placeholder: formatMessage('choose')
        };
        this.typeProcedureEditorOptions = { 
          valueExpr: "ID",
          displayExpr: "name", dataSource: [
            {
              "ID": 1,
              "name": "Thông thường",
            },
            {
              "ID": 2,
              "name": "Riêng biệt",
            },
          ],
          placeholder: formatMessage('choose')
        };
        this.coQuanEditorOptions = { 
          valueExpr: "guid",
          displayExpr: "tenDonVi", dataSource: dsToChuc.data,
          placeholder: formatMessage('choose')
        };
        this.processProcedureEditorOptions = { 
          valueExpr: "ID",
          displayExpr: "name", dataSource: [
            {
              "ID": 1,
              "name": "Quy trình số 1",
            },
            {
              "ID": 2,
              "name": "Quy trình số 2",
            },
          ],
          placeholder: formatMessage('choose')
        };
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
          return this.service.LayThuTucHC(this.guid);
        } else {
          this.hasParameter = false;
          this.linkBreadCrumb = CommonConst.THEM_THUTUCHC;
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: ThuTucHanhChinh) => {
        if (this.hasParameter) {
          this.data = data;
          this.data.trangThai = reverseMappingTrangThai(this.data.trangThai);
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
        onClick: () => this.onSave(true)
      },
    ]
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to complete any observables subscribed with takeUntil
    this.destroy$.complete(); // Complete the subject to release resources
  }

  getAttachDocuments(){
    return [
      { dataField: 'tenHoSo', caption: formatMessage('nameProfile'), cellTemplate: 'TextEditor' },
      { dataField: 'batBuoc', caption: formatMessage('validation-required'), cellTemplate: 'CheckBoxEditor', width: 100, alignment: 'center'},
      { dataField: 'file', caption: formatMessage('fileattach'), cellTemplate: 'FileUploader' },
    ]
  }

  refresh = () => {
    this.isLoading = true;
    this.formData.instance.resetValues();
    this.isLoading = false;
  }

  onSave = (redirect: boolean = false) => {
    this.isLoading = true;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: ThuTucHanhChinh = {
        tenThuTuc: this.formData.instance.getEditor('tenThuTuc').option('value'),
        coQuanThucHienID: this.formData.instance.getEditor('coQuanThucHienID').option('value'),
        linhVucID: this.formData.instance.getEditor('linhVucID').option('value'),
        typeID: this.formData.instance.getEditor('typeID').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        moTa: this.formData.instance.getEditor('moTa').option('value'),
      }
      /// call API
      if (this.hasParameter) {
        this.service.CapNhatThuTucHC(this.guid, data).subscribe({
          next: (data: ThuTucHanhChinh) => {
            this.isLoading = false;
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.THUTUCHC]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      } else {
        this.service.ThemThuTucHC(data).subscribe({
          next: (data: ThuTucHanhChinh) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.THUTUCHC]); // redirect parent page
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
    this.router.navigate([CommonConst.THUTUCHC])
  }
}
