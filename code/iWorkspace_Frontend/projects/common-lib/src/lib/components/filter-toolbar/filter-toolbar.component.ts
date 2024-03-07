import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
    DxDateRangeBoxModule } from 'devextreme-angular';
import { Filter, filter, TranslatePipeModule } from 'projects/common-lib/src/public-api';

const msInDay = 1000 * 60 * 60 * 24;
const now = new Date();
const initialValue: [Date, Date] = [
    new Date(now.getTime() - msInDay * 3),
    new Date(now.getTime() + msInDay * 3),
];

@Component({
    selector: 'filter-toolbar',
    templateUrl: './filter-toolbar.component.html',
    styleUrls: ['./filter-toolbar.component.scss'],
    providers: [],
})
export class FilterToolBarComponent {

    @Input() optionData: any[];

    @Input() labelOption: string;

    @Input() isSearchDate = false;

    @Input() isSearchStatus = false;

    // input search text
    @Input() searchObj;

    objSearch: Filter = filter;

    initialValue: [Date, Date] = initialValue;

    constructor() {
        this.objSearch.dateFrom = initialValue[0];
        this.objSearch.dateTo = initialValue[1];
    }

    onChangeSearch(data: any) { //
        this.searchObj.next(data?.value);
        // this.objSearch.search = data?.value;
    }

    onChangeDates(data: any) {
        this.objSearch.dateFrom = data?.value[0];
        this.objSearch.dateFrom = data?.value[1];
    }

    onChangeOption(e: any) {
        this.objSearch.status = e?.value;
    }
}

@NgModule({
    imports: [
        DxButtonModule,
        DxDropDownButtonModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxDateRangeBoxModule,
        TranslatePipeModule,
        CommonModule,
    ],
    providers: [],
    exports: [FilterToolBarComponent],
    declarations: [FilterToolBarComponent],
})
export class FilterToolBarModule { }
