import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ChucVu, ChucVuService, CommonConst, Notify, reverseMappingTrangThai } from 'projects/common-lib/src/public-api';
import { Subject, takeUntil, map, switchMap, of } from 'rxjs';

@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [ChucVuService],
})
export class CapNhatChucVuComponent implements OnInit{
  
  destroy$: Subject<void> = new Subject<void>();
  
  assign = Object.assign;

  isLoading = false;

  guid: string;
  
  data: any;

  linkBreadCrumb = CommonConst.SUA_CHUCVU;

  listCornerBtn: any[] = [];

  hasParameter: boolean = false;

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: ChucVuService,
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
          return this.service.LayChucVu(this.guid);
        } else {
          this.hasParameter = false;
          this.linkBreadCrumb = CommonConst.THEM_CHUCVU;
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: ChucVu) => {
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
      const data: ChucVu = {
        tenChucVu: this.formData.instance.getEditor('tenChucVu').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        moTa: this.formData.instance.getEditor('moTa').option('value'),
        trangThai: this.formData.instance.getEditor('trangThai').option('value') // Không cho cập nhật trạng thái
      }
      /// call API
      if (this.hasParameter) {
        this.service.CapNhatChucVu(this.guid, data).subscribe({
          next: (data: ChucVu) => {
            this.isLoading = false;
            Notify(formatMessage('edit-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.CHUCVU]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      } else {
        this.service.ThemChucVu(data).subscribe({
          next: (data: ChucVu) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.CHUCVU]); // redirect parent page
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
    this.router.navigate([CommonConst.CHUCVU])
  }
}
