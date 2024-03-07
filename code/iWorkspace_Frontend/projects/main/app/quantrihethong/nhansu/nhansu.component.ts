import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
  DxDataGridModule, DxDataGridComponent, DxDateBoxModule, DxScrollViewModule, DxToolbarModule, DxFormModule, DxNumberBoxModule, DxTagBoxModule, DxCheckBoxModule, DxLoadPanelModule} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { formatMessage } from 'devextreme/localization';
import { Subject, lastValueFrom } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { filterDTO, NhanSu, NhanSuService, FilterToolBarComponent, FilterToolBarModule, TranslatePipeModule,
  Filter, PAGE_OPTIONS, ALLOW_PAGE_SIZE, CommonConst, Notify, BreadCrumbModule, CoQuanFormModule, mappingTrangThaiString, FormAvatarModule, CornerButtonModule, ApplyPipeModule } from 'projects/common-lib/src/public-api';
import { CommonModule } from '@angular/common';
import { CapNhatNhanSuComponent } from './capnhat/capnhat.component';

@Component({
  templateUrl: './nhansu.component.html',
  styleUrls: ['./nhansu.component.scss'],
  providers: [NhanSuService],
})
export class NhanSuComponent {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
  @ViewChild(FilterToolBarComponent, { static: false }) filterNewForm: FilterToolBarComponent;
  
  formatMessage = formatMessage;

  readonly allowedPageSizes = ALLOW_PAGE_SIZE;

  readonly linkBreadCrumb = CommonConst.NHANSU;

  searchSubject = new Subject<string>();

  readonly debounceTimeMs = 100; // Set the debounce time (in milliseconds)

  inputText: string = '';

  pageIndex = PAGE_OPTIONS.DEFAULT_PAGE_INDEX;

  pageSize = PAGE_OPTIONS.DEFAULT_PAGE_SIZE;

  dataSource: DataSource = new DataSource({
    store: new CustomStore({
      key: 'guid',
      load: () => {
        const params: Filter = {
          pageIndex: this.pageIndex + 1,
          pageSize: this.pageSize,
        };
        if (this.inputText !== '') {
          params.hoVaTen = this.inputText;
        }
        return lastValueFrom(this.service.LayDSNhanSu(params))
          .then((data: filterDTO<NhanSu>) => {
            data.data.forEach((item: any) => {
              item.trangThai = mappingTrangThaiString(item.trangThai);
              item.quyen = item.vaiTro.join(', ');
            });
            return data;
          })
          .catch((error) => {console.log(error)});
      },
      remove: (key: string) => {
        if (key !== null && key !== undefined) {
          return lastValueFrom(this.service.XoaNhanSu(key))
            .then((response) => {
              this.dataGrid.instance.refresh();
              Notify(formatMessage('delete-message'), 'success', 1000); // notification
            })
            .catch(({message}) => console.log(message));
        }
      }
    })
  });

  constructor(private service: NhanSuService, private router: Router) {
    this.onEditClick = this.onEditClick.bind(this);
  }

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  performSearch(searchValue: string) {
    this.inputText = searchValue;
    this.dataGrid.instance.refresh();
  }

  onRowClick(e: any) {
    this.router.navigate([CommonConst.SUA_NHANSU, e.data.guid]);
  }

  onEditClick(e: any) {
    e.event.preventDefault();
    this.router.navigate([CommonConst.SUA_NHANSU, e.row.data.guid]);
  }

  addMember() {
    this.router.navigate([CommonConst.THEM_NHANSU]);
  };

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  onContentReady(e:any): void { // load data when change page size and page index
    let dataGrid = e.component;
    if (dataGrid.pageIndex() !== this.pageIndex || dataGrid.pageSize() !== this.pageSize) {
      this.pageIndex = dataGrid.pageIndex(); // 
      this.pageSize = dataGrid.pageSize();

      this.dataGrid.instance.refresh(); // gọi là API
    }
  }

}

@NgModule({
    imports: [
      DxButtonModule,
      DxDataGridModule,
      DxDropDownButtonModule,
      DxSelectBoxModule,
      DxTextBoxModule,
      BreadCrumbModule,

      FilterToolBarModule,
      TranslatePipeModule,
      DxDateBoxModule,
      DxScrollViewModule,
      DxToolbarModule,
      DxFormModule,
      DxNumberBoxModule,
      DxTagBoxModule,
      DxCheckBoxModule,
      FormAvatarModule,
      CornerButtonModule,
      CommonModule,
      CoQuanFormModule,
      DxLoadPanelModule,

      ApplyPipeModule
    ],
    providers: [],
    exports: [],
    declarations: [NhanSuComponent, CapNhatNhanSuComponent],
})
export class NhanSuModule { }
