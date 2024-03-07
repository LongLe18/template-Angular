import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
  DxDataGridModule, DxDataGridComponent, DxScrollViewModule, DxToolbarModule, DxTabPanelModule, DxFormModule, DxTextAreaModule, DxNumberBoxModule, DxLoadPanelModule} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { formatMessage } from 'devextreme/localization';
import { Subject, lastValueFrom } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { filterDTO, DaiBieuNN, DaiBieuNNService, FilterToolBarComponent, FilterToolBarModule, TranslatePipeModule,
  Filter, PAGE_OPTIONS, ALLOW_PAGE_SIZE, CommonConst, Notify, BreadCrumbModule, mappingTrangThaiString, CornerButtonModule, ApplyPipeModule, } from 'projects/common-lib/src/public-api';
import { CapNhatDaiBieuNNComponent } from './capnhat/capnhat.component';

@Component({
  templateUrl: './daibieunn.component.html',
  styleUrls: ['./daibieunn.component.scss'],
  providers: [DaiBieuNNService],
})
export class DaiBieuNNComponent {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
  @ViewChild(FilterToolBarComponent, { static: false }) filterNewForm: FilterToolBarComponent;
  
  formatMessage = formatMessage;

  readonly allowedPageSizes = ALLOW_PAGE_SIZE;

  readonly linkBreadCrumb = CommonConst.DAIBIEUNN;

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
          params.tenCongNghe = this.inputText;
        }
        return lastValueFrom(this.service.LayDSDaiBieuNN(params))
          .then((data: filterDTO<DaiBieuNN>) => {
            data.data.forEach((item: any) => {
              item.trangThai = mappingTrangThaiString(item.trangThai);
            });
            return data;
          })
          .catch((error) => {console.log(error)});
      },
      remove: (key: string) =>  {
        if (key !== null && key !== undefined) {
          return lastValueFrom(this.service.XoaDaiBieuNN(key))
            .then((response) => {
              this.dataGrid.instance.refresh();
              Notify(formatMessage('delete-message'), 'success', 1000); // notification
            })
            .catch(({message}) => console.log(message));
        }
      }
    })
  });

  constructor(private service: DaiBieuNNService, private router: Router) {
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
    this.router.navigate([CommonConst.SUA_DAIBIEUNN, e.data.guid]);
  }

  onEditClick(e: any) {
    e.event.preventDefault();
    this.router.navigate([CommonConst.SUA_DAIBIEUNN, e.row.data.guid]);
  }

  addTechnology() {
    this.router.navigate([CommonConst.THEM_DAIBIEUNN]);
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
      DxTabPanelModule,
      DxFormModule,
      DxTextAreaModule,
      DxNumberBoxModule,
      CornerButtonModule,
      ApplyPipeModule,
      DxLoadPanelModule,
    ],
    providers: [],
    exports: [],
    declarations: [DaiBieuNNComponent, CapNhatDaiBieuNNComponent],
})
export class CDaiBieuNNModule { }
