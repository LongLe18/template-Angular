import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { DxButtonModule, DxCheckBoxModule, DxDataGridComponent, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';
import { TranslatePipeModule } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import ArrayStore from 'devextreme/data/array_store';

interface ObjectCoQuan {
    [key: string]: any;
}

interface SelectBoxData {
    dataField: string,
    data: ArrayStore,
    valueExpr: string,
    displayExpr: string,
    disabled?: boolean,
}

@Component({
    selector: 'coquan',
    templateUrl: './coquan.component.html',
    styleUrls: ['./coquan.component.scss'],
    providers: []
})
export class CoQuanFormComponent implements OnInit {
    
    @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;

    @Input() items: Record<string, any>[] = []; // Danh sách cột của grid

    @Input() data: ObjectCoQuan[] = []; // có thể là ArrayStore, CustomStore

    @Input() action = true; // có cột thao tác hay không

    @Input() actionAddRow = true; // có btn thêm dòng mới hay không

    @Input() titleBtn = 'addOrganizationAndPosition' // title này dùng để translate btn thêm dòng mới

    @Input() selectBoxData: SelectBoxData[]  // data cho select box

    initObject: any;

    constructor() {}

    ngOnInit(): void {
        const newDataObject = {};
        for (let i = 0; i < this.items.length; i++) {
            newDataObject[this.items[i].dataField] = '';
            newDataObject['guid'] = (i + 2).toString();
        }
        if (this.data.length === 0) this.data.push(newDataObject);
        this.initObject = newDataObject;
    }

    addRow() {
        this.data.push({ ...this.initObject, guid: this.initObject.guid + this.data.length + 1 }); 
    }

    onCellPrepared(e) { 
        // Nếu hàng nào không được xóa bổ sung thêm trường isDeleted: boolean = false (Đối với data được truyền vào)
        if (e.columnIndex == 4 && e.rowType == "data") {  
            if (e.rowIndex < 3 && this.data[e.rowIndex].isDeleted === false) {
                const element = e.cellElement as HTMLElement;
                element.removeChild(element.childNodes[0])
            }
        }  

        // disable cell follow data
        if (e.columnIndex === 1 && e.rowType === "data") {
            if (e.rowIndex < 3 && this.data[e.rowIndex].isDisabled === true) {
                const cellElement = e.cellElement as HTMLElement;
                const childCell = cellElement.querySelector('.dx-texteditor ');
                childCell.classList.add('dx-state-disabled');
            }
        }
    }  

    onValueChanged(e, info) {
        console.log(e)
        if (e.component.NAME === 'dxFileUploader') {
            const element = e.element as HTMLElement;
            const childElement = element.getElementsByClassName('dx-fileuploader-upload-button');
            for (let i = 0; i <= childElement.length; i++) {
                childElement[0].parentNode.removeChild(childElement[0])
            }
        }
        const newValue = e.value;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][info.column.dataField] === e.previousValue) {
                this.data[i][info.column.dataField] = newValue;
                break; 
            }
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        DxButtonModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxCheckBoxModule,
        DxNumberBoxModule,
        DxFileUploaderModule,
        DxDateBoxModule,

        TranslatePipeModule,
    ],
    providers: [],
    exports: [CoQuanFormComponent],
    declarations: [CoQuanFormComponent],
})
export class CoQuanFormModule { }
