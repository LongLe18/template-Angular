import { Component, DEFAULT_CURRENCY_CODE, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
  DxDataGridModule, DxDataGridComponent, DxTabsModule} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { formatMessage } from 'devextreme/localization';
import { BaoCaoCQTC, BaoCaoCQTCService, TranslatePipeModule,
  Filter, CommonConst, Notify, BreadCrumbModule, CurrencyCustomPipeModule } from 'projects/common-lib/src/public-api';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import ArrayStore from 'devextreme/data/array_store';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  templateUrl: './baocaocqtc.component.html',
  styleUrls: ['./baocaocqtc.component.scss'],
  providers: [BaoCaoCQTCService, {provide: DEFAULT_CURRENCY_CODE, useValue: 'VND' }],
})
export class BaoCaoCQTCComponent {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
  
  formatMessage = formatMessage;

  readonly linkBreadCrumb = CommonConst.BAOCAOCQTC;

  yearsOption = [{
    "value": "2022",
    "text": "2022",
  }, {
    "value": "2023",
    "text": "2023",
  }]

  tabsOption: ArrayStore = new ArrayStore({
    data: this.service.loaiCoQuan,
    key: 'id'
  });

  LoaiCQ = {
    text: 'CQTC NƯỚC NGOÀI',
    id: 1
  };

  dataSource: DataSource = new DataSource({
    store: new CustomStore({
      key: 'guid',
      load: () => 
      {
        const params: Filter = {
          loaiCQ: this.LoaiCQ.id
        };
        
        return lastValueFrom(this.service.LayDSBaoCaoCQTC(params))
          .then((data: any) => {
            const showData = data.filter(item => item.loaiCoQuanID === this.LoaiCQ.id); // Kết nối api sẽ không cần dòng này nữa
            showData.forEach((item, index) => item.kinhPhi = item.kinhPhi.toLocaleString('it-IT', {style : 'currency', currency : 'VND',  }));
            return showData;
          })
          .catch((error) => {console.log(error)});
      },
    })
  });

  constructor(private service: BaoCaoCQTCService, private router: Router) {
    // this.onEditClick = this.onEditClick.bind(this);
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Baocaotheocoquantochuc.xlsx');
      });
    });
  }
  
  onItemTabClick(e) {
    this.LoaiCQ = e.itemData;
    this.dataSource.reload()
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
      DxSelectBoxModule,
      DxTabsModule,
      CurrencyCustomPipeModule,
      
      CommonModule,
      TranslatePipeModule,
    ],
    providers: [],
    exports: [],
    declarations: [BaoCaoCQTCComponent],
})
export class BaoCaoCQTCModule { }
