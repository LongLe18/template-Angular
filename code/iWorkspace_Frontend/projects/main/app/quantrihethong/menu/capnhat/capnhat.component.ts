import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { formatMessage } from 'devextreme/localization';

import { Menu, MenuService, CommonConst, Notify, VaiTroService, reverseMappingTrangThai } from 'projects/common-lib/src/public-api';
import { Subject, forkJoin, map, of, switchMap, takeUntil } from 'rxjs';
@Component({
    templateUrl: './capnhat.component.html',
    styleUrls: ['./capnhat.component.scss'],
    providers: [MenuService, VaiTroService],
})
export class CapNhatMenuComponent implements OnInit{

  destroy$: Subject<void> = new Subject<void>();

  assign = Object.assign;

  formatMessage = formatMessage;

  isLoading = false;

  guid: string;
  
  parentFunctionEditorOptions: Object;

  vaiTroOptions: Object;

  data: any;

  listCornerBtn: any[] = [];

  linkBreadCrumb = CommonConst.SUA_MENU;

  hasParameter: boolean = false;

  roleData: Object[] = [
    {
      "ID": 1,
      "name": "Vai trò 1",
    },
    {
      "ID": 2,
      "name": "Vai trò 2",
    },
  ];

  @ViewChild(DxFormComponent, { static: false }) formData: DxFormComponent

  constructor(private router: Router, private service: MenuService,
    private route: ActivatedRoute, private vaiTroService: VaiTroService) {
      forkJoin([
        this.vaiTroService.LayDSVaiTro()
      ]).subscribe(([dsVaiTro]) => {
        this.parentFunctionEditorOptions = { 
          searchEnabled: true, valueExpr: "guid",
          displayExpr: "tenChucNang", dataSource: this.service.DanhMucCha,
           placeholder: formatMessage('choose')
        };

        this.vaiTroOptions = { 
          searchEnabled: true, valueExpr: "guid",
          displayExpr: "tenVaiTro", 
          hideSelectedItems: true,
          dataSource: dsVaiTro.data,
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
          return this.service.LayMenu(this.guid);
        } else {
          this.hasParameter = false;
          this.linkBreadCrumb = CommonConst.THEM_MENU;
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: Menu) => {
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
        onClick:  () => this.onSave(false)
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
      const data: Menu = {
        tenChucNang: this.formData.instance.getEditor('tenChucNang').option('value'),
        thuTu: this.formData.instance.getEditor('thuTu').option('value'),
        chucNangCha: this.formData.instance.getEditor('chucNangCha').option('value'),
        vaiTro: this.formData.instance.getEditor('vaiTro').option('value'),
        url: this.formData.instance.getEditor('url').option('value'),
        trangThai: this.formData.instance.getEditor('trangThai').option('value') // Không cho cập nhật trạng thái
      }
      /// call API
      if (this.hasParameter) {
        this.service.CapNhatMenu(this.guid, data).subscribe({
          next: (data: Menu) => {
            this.isLoading = false;
            Notify(formatMessage('edit-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.MENU]); // redirect parent page
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
          }
        })
      } else {
        this.service.ThemMenu(data).subscribe({
          next: (data: Menu) => {
            this.isLoading = false;
            this.formData.instance.resetValues();
            Notify(formatMessage('add-message'), 'success', 1000);
            if (redirect) this.router.navigate([CommonConst.MENU]); // redirect parent page
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
    this.router.navigate([CommonConst.MENU])
  }
}

