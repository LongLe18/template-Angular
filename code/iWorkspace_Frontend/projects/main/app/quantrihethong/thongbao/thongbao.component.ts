import { Component, NgModule, ViewChild } from "@angular/core";
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
    DxDataGridModule, DxDataGridComponent} from 'devextreme-angular';
import { ALLOW_PAGE_SIZE, BreadCrumbModule, CommonConst, Filter, FilterToolBarComponent, FilterToolBarModule, 
    Notify, PAGE_OPTIONS, ThongBao, ThongBaoService, TranslatePipeModule, filterDTO } from "projects/common-lib/src/public-api";
import { formatMessage } from 'devextreme/localization';
import { Subject, debounceTime, lastValueFrom } from 'rxjs';
import { Router } from "@angular/router";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { DatePipe } from "@angular/common";
import ArrayStore from "devextreme/data/array_store";
import { DxoHeaderFilterModule } from "devextreme-angular/ui/nested";

@Component({
    templateUrl: './thongbao.component.html',
    styleUrls: ['./thongbao.component.scss'],
    providers: [ThongBaoService],
})

export class ThongBaoComponent {

    @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
    @ViewChild(FilterToolBarComponent, { static: false }) filterNewForm: FilterToolBarComponent;
    
    formatMessage = formatMessage;

    readonly allowedPageSizes = ALLOW_PAGE_SIZE;

    readonly linkBreadCrumb = CommonConst.THONGBAO;

    searchSubject = new Subject<string>();

    readonly debounceTimeMs = 100; // Set the debounce time (in milliseconds)

    inputText: string = '';

    pageIndex = PAGE_OPTIONS.DEFAULT_PAGE_INDEX;

    pageSize = PAGE_OPTIONS.DEFAULT_PAGE_SIZE;

    senderArr = [];

    dataSource: DataSource 

    constructor(private router: Router, private service: ThongBaoService) {
        this.dataSource = new DataSource({
            store: new CustomStore({
                key: 'guid',
                load: () =>  {
                    const params: Filter = {
                        pageIndex: this.pageIndex + 1,
                        pageSize: this.pageSize,
                    };
                    if (this.inputText !== '') {
                        params.tieuDe = this.inputText;
                    }
                    return lastValueFrom(this.service.LayDSThongBao(params))
                        .then((data: filterDTO<ThongBao>) => {
                            data.data.forEach((item: any) => {
                                this.senderArr.push(item.nguoiGui)
                            });
                            return data;
                         })
                        .catch((error) => {console.log(error)});
                  },
                remove: (key: string) =>  {
                    if (key !== null && key !== undefined) {
                      return lastValueFrom(this.service.XoaThongBao(key))
                        .then((response) => {
                          this.dataGrid.instance.refresh();
                          Notify(formatMessage('delete-message'), 'success', 1000); // notification
                        })
                        .catch(({message}) => console.log(message));
                    }
                  }
            }),
        });
        this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    }

    ngOnInit() {
        this.searchSubject
            .pipe(debounceTime(this.debounceTimeMs))
            .subscribe((searchValue) => {
                this.performSearch(searchValue);
        });
    }

    orderHeaderFilter(data) {
        data.dataSource.postProcess = (results) => {
            const temp = results;
            results = [];
            temp.forEach(item => {
                results.push({
                    value: item.value.nguoiGuiID,
                    text: item.value.hoVaTen
                })
            })
            return results;
        };
    }

    marked = () => { // event đánh dấu đã đọc

    }

    ngOnDestroy() {
        this.searchSubject.complete();
    }

    performSearch(searchValue: string) {
        this.inputText = searchValue;
        this.dataGrid.instance.refresh();
    }

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
      DxoHeaderFilterModule,
      BreadCrumbModule,

      FilterToolBarModule,
      TranslatePipeModule,
      DatePipe,
    ],
    providers: [],
    exports: [],
    declarations: [ThongBaoComponent],
})
export class ThongBaoModule { }

