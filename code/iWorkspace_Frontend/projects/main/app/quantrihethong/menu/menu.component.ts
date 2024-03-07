import { Component, NgModule, ViewChild } from "@angular/core";
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
    DxDataGridModule, DxDataGridComponent, DxScrollViewModule, DxToolbarModule, DxFormModule, DxNumberBoxModule, DxTreeViewModule, DxDropDownBoxModule, DxLoadPanelModule} from 'devextreme-angular';
import { ALLOW_PAGE_SIZE, BreadCrumbModule, CommonConst, Filter, FilterToolBarComponent, FilterToolBarModule, filterDTO, 
    MenuService, Notify, PAGE_OPTIONS, TranslatePipeModule, Menu, mappingTrangThaiString, CornerButtonModule, ApplyPipeModule } from "projects/common-lib/src/public-api";
import { formatMessage } from 'devextreme/localization';
import { Subject, debounceTime, lastValueFrom } from 'rxjs';
import { Router } from "@angular/router";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { CapNhatMenuComponent } from "./capnhat/capnhat.component";

@Component({
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    providers: [MenuService],
})

export class MenuComponent {

    @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
    @ViewChild(FilterToolBarComponent, { static: false }) filterNewForm: FilterToolBarComponent;
    
    formatMessage = formatMessage;

    readonly allowedPageSizes = ALLOW_PAGE_SIZE;

    readonly linkBreadCrumb = CommonConst.MENU;

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
                  params.tenChucNang = this.inputText;
                }
                return lastValueFrom(this.service.LayDSMenu(params))
                    .then((data: filterDTO<Menu>) => {
                            data.data.forEach((item: any) => {
                            item.thuTu = item.thuTu.toString();
                            item.trangThai = mappingTrangThaiString(item.trangThai);
                        });
                        return data;
                    })
                    .catch((error) => {console.log(error)});
            },
            remove: (key: string) => {
                if (key !== null && key !== undefined) {
                  return lastValueFrom(this.service.XoaMenu(key))
                    .then((response) => {
                      this.dataGrid.instance.refresh();
                      Notify(formatMessage('delete-message'), 'success', 1000); // notification
                    })
                    .catch(({message}) => console.log(message));
                }
            }
        })
    });
      
    constructor(private router: Router, private service: MenuService) {
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

    onRowClick(e: any) {
        this.router.navigate([CommonConst.SUA_MENU, e.data.guid]);
    }

    onEditClick(e: any) {
        e.event.preventDefault();
        // redirect to page edit
        this.router.navigate([CommonConst.SUA_MENU, e.row.data.guid]);
    }

    performSearch(searchValue: string) {
        this.inputText = searchValue;
        this.dataGrid.instance.refresh();
    }

    refresh = () => {
        this.dataGrid.instance.refresh();
    };

    addMenu() {
        // redirect to add page
        this.router.navigate([CommonConst.THEM_MENU]);
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
        DxNumberBoxModule,
        DxTreeViewModule,
        DxDropDownBoxModule,
        CornerButtonModule,
        DxLoadPanelModule,

        ApplyPipeModule
    ],
    providers: [],
    exports: [],
    declarations: [MenuComponent, CapNhatMenuComponent],
})
export class MenuModule { }

