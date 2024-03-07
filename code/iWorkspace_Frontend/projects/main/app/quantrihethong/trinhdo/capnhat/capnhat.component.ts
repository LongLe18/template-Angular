import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {  DxFormComponent } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { TrinhDo, TrinhDoService, 
  CommonConst, Notify, reverseMappingTrangThai } from 'projects/common-lib/src/public-api';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';

@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [TrinhDoService],
})
export class CapNhatTrinhDoComponent implements OnInit{
  
  destroy$: Subject<void> = new Subject<void>();

  assign = Object.assign;

  isLoading = false;

  guid: string;
  
  data: any;

  listCornerBtn: any[] = [];

  linkBreadCrumb = CommonConst.SUA_TRINHDO;

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  hasParameter: boolean = false;

  constructor(private router: Router, private service: TrinhDoService,
    private route: ActivatedRoute) {
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
          return this.service.LayTrinhDo(this.guid);
        } else {
          this.hasParameter = false;
          this.linkBreadCrumb = CommonConst.THEM_TRINHDO;
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: TrinhDo) => {
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
      const data: TrinhDo = {
        ten: this.formData.instance.getEditor('ten').option('value'),
        moTa: this.formData.instance.getEditor('moTa').option('value'),
        tenVietTat: this.formData.instance.getEditor('tenVietTat').option('value'),
        trangThai: this.formData.instance.getEditor('trangThai').option('value') // Không cho cập nhật trạng thái
      }
      /// call API
      if (this.hasParameter) {
        this.service.CapNhatTrinhDo(this.guid, data).subscribe({
          next: (data: TrinhDo) => {
            this.isLoading = false;
            Notify(formatMessage('edit-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.TRINHDO]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      } else {
        this.service.ThemTrinhDo(data).subscribe({
          next: (data: TrinhDo) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.TRINHDO]); // redirect parent page
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
    this.router.navigate([CommonConst.TRINHDO])
  }

}

