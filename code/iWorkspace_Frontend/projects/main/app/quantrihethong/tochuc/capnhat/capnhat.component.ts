import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxFormComponent,} from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { ToChuc, ToChucService, CommonConst, Notify, reverseMappingTrangThai } from 'projects/common-lib/src/public-api';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';
@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [ToChucService],
})
export class CapNhatToChucComponent implements OnInit{

  destroy$: Subject<void> = new Subject<void>();

  assign = Object.assign;

  formatMessage = formatMessage;

  isLoading = false;

  guid: string;
  
  data: any;

  listCornerBtn: any[] = [];

  parentUnitEditorOptions: Object;

  linkBreadCrumb = CommonConst.SUA_TOCHUC;

  hasParameter: boolean = false;

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: ToChucService,
    private route: ActivatedRoute) {
    const ParentUnitItems = [
      {
        label: "Cha 1",
        value: 1,
      },
      {
        label: "Cha 2",
        value: 2
      }
    ]
    this.parentUnitEditorOptions = { 
      searchEnabled: true, valueExpr: "value",
      displayExpr: "label", dataSource: ParentUnitItems,
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
          return this.service.LayToChuc(this.guid);
        } else {
          this.hasParameter = false;
          this.linkBreadCrumb = CommonConst.THEM_TOCHUC;
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: ToChuc) => {
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
    this.isLoading = false;
    const isValid = this.formData.instance.validate().isValid;
    if (isValid) {
      const data: ToChuc = {
        tenDonVi: this.formData.instance.getEditor('tenDonVi').option('value'),
        donViCha: this.formData.instance.getEditor('donViCha').option('value'),
        capDonVi: this.formData.instance.getEditor('capDonVi').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        moTa: this.formData.instance.getEditor('moTa').option('value'),
        trangThai: this.formData.instance.getEditor('trangThai').option('value'),
      }
      /// call API
      if (this.hasParameter) {
        this.service.CapNhatToChuc(this.guid, data).subscribe({
          next: (data: ToChuc) => {
            this.isLoading = false;
            Notify(formatMessage('edit-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.TOCHUC]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      } else {
        this.service.ThemToChuc(data).subscribe({
          next: (data: ToChuc) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            this.router.navigate([CommonConst.TOCHUC]); // redirect parent page
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
    this.router.navigate([CommonConst.TOCHUC])
  }

}