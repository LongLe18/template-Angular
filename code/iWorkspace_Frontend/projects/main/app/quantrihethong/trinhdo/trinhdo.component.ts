import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
  DxDataGridModule, DxDataGridComponent, DxScrollViewModule, DxToolbarModule,
  DxFormModule, DxTextAreaModule, DxLoadPanelModule} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { formatMessage } from 'devextreme/localization';
import { Subject, lastValueFrom } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TrinhDo, TrinhDoService, FilterToolBarComponent, FilterToolBarModule, TranslatePipeModule,
  Filter, PAGE_OPTIONS, ALLOW_PAGE_SIZE, CommonConst, Notify, BreadCrumbModule, filterDTO, mappingTrangThaiString, 
  CornerButtonModule, ApplyPipeModule, } from 'projects/common-lib/src/public-api';
import { CapNhatTrinhDoComponent } from './capnhat/capnhat.component';

@Component({
  templateUrl: './trinhdo.component.html',
  styleUrls: ['./trinhdo.component.scss'],
  providers: [TrinhDoService],
})
export class TrinhDoComponent {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
  @ViewChild(FilterToolBarComponent, { static: false }) filterNewForm: FilterToolBarComponent;
  
  formatMessage = formatMessage;

  readonly allowedPageSizes = ALLOW_PAGE_SIZE;

  readonly linkBreadCrumb = CommonConst.TRINHDO;

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
          params.ten = this.inputText;
        }
        return lastValueFrom(this.service.LayDSTrinhDo(params))
          .then((data: filterDTO<TrinhDo>) => {
            data.data.forEach((item: any) => {
              item.trangThai = mappingTrangThaiString(item.trangThai);
            });
            return data;
          })
          .catch((error) => {console.log(error)});
      },
      remove: (key: string) => new Promise((resolve, reject) => {
        if (key !== null && key !== undefined) {
          this.service.XoaTrinhDo(key).subscribe({
            next: () => {
              this.dataGrid.instance.refresh();
              Notify(formatMessage('delete-message'), 'success', 1000); // notification
              resolve();
            },
            error: ({message}) => reject(message)
          })
        }
      }),
    })
  });

  constructor(private service: TrinhDoService, private router: Router) {
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
    this.router.navigate([CommonConst.SUA_TRINHDO, e.data.guid]);
  }

  onEditClick(e: any) {
    e.event.preventDefault();
    this.router.navigate([CommonConst.SUA_TRINHDO, e.row.data.guid]);
  }

  addLevel() {
    this.router.navigate([CommonConst.THEM_TRINHDO]);
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
      DxScrollViewModule,
      DxToolbarModule,
      DxFormModule,
      DxTextAreaModule,
      CornerButtonModule,
      ApplyPipeModule,
      DxLoadPanelModule,
    ],
    providers: [],
    exports: [],
    declarations: [TrinhDoComponent, CapNhatTrinhDoComponent],
})
export class TrinhDoModule { }
