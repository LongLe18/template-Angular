import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { DiaDiem, DiaDiemService, CommonConst, Notify, reverseMappingTrangThai } from 'projects/common-lib/src/public-api';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';
@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [DiaDiemService],
})
export class CapNhatDiaDiemComponent implements OnInit{
  
  destroy$: Subject<void> = new Subject<void>();

  assign = Object.assign;

  isLoading = false;

  guid: string;
  
  data: any;

  linkBreadCrumb = CommonConst.SUA_DIADIEM;

  listCornerBtn: any[] = [];

  trinhTrangOptions: Object;
  
  hasParameter: boolean = false;

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: DiaDiemService,
    private route: ActivatedRoute) {
      this.trinhTrangOptions = { 
        valueExpr: "guid",
        displayExpr: "label", 
        dataSource: this.service.tinhTrang,
        placeholder: formatMessage('choose')
      };
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
          return this.service.LayDiaDiem(this.guid);
        } else {
          this.hasParameter = false;
          this.linkBreadCrumb = CommonConst.THEM_DIADIEM;
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: DiaDiem) => {
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
  
  refresh = () => {
    this.isLoading = true;
    this.formData.instance.resetValues();
    this.isLoading = false;
  }

  onSave = (redirect: boolean = false) => {
    this.isLoading = true;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: DiaDiem = {
        tenDiaDiem: this.formData.instance.getEditor('tenDiaDiem').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        tinhTrangID: this.formData.instance.getEditor('tinhTrangID').option('value'),
        trangThai: this.formData.instance.getEditor('trangThai').option('value') // Không cho cập nhật trạng thái
      }
      /// call API
      if (this.hasParameter) {
        this.service.CapNhatDiaDiem(this.guid, data).subscribe({
          next: (data: DiaDiem) => {
            this.isLoading = false;
            Notify(formatMessage('edit-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.DIADIEM]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      } else {
        this.service.ThemDiaDiem(data).subscribe({
          next: (data: DiaDiem) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.DIADIEM]); // redirect parent page
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
    this.router.navigate([CommonConst.DIADIEM])
  }
}

