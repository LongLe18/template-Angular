import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
  DxDataGridModule, DxDataGridComponent, DxFileUploaderModule, DxFormModule, DxHtmlEditorModule, DxNumberBoxModule, DxScrollViewModule, DxTextAreaModule, DxToolbarModule, DxLoadPanelModule} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { formatMessage } from 'devextreme/localization';
import { Subject, lastValueFrom } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { filterDTO, ThuTucHCService, FilterToolBarComponent, FilterToolBarModule, TranslatePipeModule,
  Filter, PAGE_OPTIONS, ALLOW_PAGE_SIZE, CommonConst, Notify, BreadCrumbModule, ThuTucHC, QuaTrinhXuLy, PhienBan, ApplyPipeModule, CoQuanFormModule, CornerButtonModule, } from 'projects/common-lib/src/public-api';
import { QuaTrinhXuLyHoSoModule } from '../components/quatrinhxulyHoSopopup/quatrinhxulyHS.component';
import { CommonModule } from '@angular/common';
import { ChuyenTiepModule } from '../components/chuyentiepPopup/chuyentiep.component';
import { ThemmoiDangKyTTHCComponent } from './them/themmoi.component';
import { CapNhatDangKyTTHCComponent } from './capnhat/capnhat.component';

@Component({
  templateUrl: './dangkytthc.component.html',
  styleUrls: ['./dangkytthc.component.scss'],
  providers: [ThuTucHCService],
})
export class DangKyThuTucHCComponent {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
  @ViewChild(FilterToolBarComponent, { static: false }) filterNewForm: FilterToolBarComponent;
  
  formatMessage = formatMessage;

  readonly allowedPageSizes = ALLOW_PAGE_SIZE;

  readonly linkBreadCrumb = CommonConst.DANGKYTTHC;

  searchSubject = new Subject<string>();

  readonly debounceTimeMs = 100; // Set the debounce time (in milliseconds)

  inputText: string = '';

  pageIndex = PAGE_OPTIONS.DEFAULT_PAGE_INDEX;

  pageSize = PAGE_OPTIONS.DEFAULT_PAGE_SIZE;

  isProcessingProcedurePopupOpened = false;

  dataSource: DataSource = new DataSource({
    store: new CustomStore({
      key: 'guid',
      load: () => {
        const params: Filter = {
          pageIndex: this.pageIndex + 1,
          pageSize: this.pageSize,
        };
        if (this.inputText !== '') {
        }
        return lastValueFrom(this.service.LayDSThuTucHC(params))
          .then((data: filterDTO<ThuTucHC>) => {
            return data;
          })
          .catch((error) => {console.log(error)});
      },
      remove: (key: string) =>  {
        if (key !== null && key !== undefined) {
          return lastValueFrom(this.service.XoaThuTucHC(key))
            .then((response) => {
              this.dataGrid.instance.refresh();
              Notify(formatMessage('delete-message'), 'success', 1000); // notification
            })
            .catch(({message}) => console.log(message));
        }
      }
    })
  });

  dataThuTuc: QuaTrinhXuLy[];
  dataPhienBan: PhienBan[];

  constructor(private service: ThuTucHCService, private router: Router) {
    this.onEditClick = this.onEditClick.bind(this);
    this.viewProcessingProcedure = this.viewProcessingProcedure.bind(this);
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

  viewProcessingProcedure(e: any) {
    e.event.preventDefault();
    this.service.LayThuTucHC(e.row.data.guid).subscribe({
      next: (data: ThuTucHC) => {
        this.dataThuTuc = data.quaTrinhXuLy;
        this.dataPhienBan = data.phienBan;
      },
      error: err => {
        console.log(err);
      }
    });
    this.isProcessingProcedurePopupOpened = true;
  };

  performSearch(searchValue: string) {
    this.inputText = searchValue;
    this.dataGrid.instance.refresh();
  }

  onRowClick(e: any) {
    this.router.navigate([CommonConst.SUA_DANGKYTTHC, e.data.guid]);
  }

  onEditClick(e: any) {
    e.event.preventDefault();
    this.router.navigate([CommonConst.SUA_DANGKYTTHC, e.row.data.guid]);
  }

  themDangKyTTHC() {
    this.router.navigate([CommonConst.THEM_DANGKYTTHC]);
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
      QuaTrinhXuLyHoSoModule,

      FilterToolBarModule,
      TranslatePipeModule,

      DxScrollViewModule,
      DxToolbarModule,
      DxFormModule,
      DxTextAreaModule,
      DxNumberBoxModule,
      CornerButtonModule,
      CoQuanFormModule,
      DxFileUploaderModule,
      ChuyenTiepModule,
      DxHtmlEditorModule,

      CommonModule,
      ApplyPipeModule,
      DxLoadPanelModule,
    ],
    providers: [],
    exports: [],
    declarations: [DangKyThuTucHCComponent, ThemmoiDangKyTTHCComponent, CapNhatDangKyTTHCComponent],
})
export class DangKyThuTucHCModule { }
