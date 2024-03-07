import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
  DxDataGridModule, DxDataGridComponent, DxTabsModule} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { formatMessage } from 'devextreme/localization';
import { BaoCaoNKH, BaoCaoNhaKHService, TranslatePipeModule,
  Filter, CommonConst, Notify, BreadCrumbModule, } from 'projects/common-lib/src/public-api';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  templateUrl: './baocaonkh.component.html',
  styleUrls: ['./baocaonkh.component.scss'],
  providers: [BaoCaoNhaKHService],
})
export class BaoCaoNKHComponent {

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

  dataSource: DataSource = new DataSource({
    store: new CustomStore({
      key: 'guid',
      load: () => {
        const params: Filter = {
          // năm báo cáo
        };
        
        return lastValueFrom(this.service.LayDSBaoCaoNhaKH(params))
          .then((data: BaoCaoNKH[]) => {
            return data;
          })
          .catch((error) => {console.log(error)});
      },
    })
  });

  constructor(private service: BaoCaoNhaKHService, private router: Router) {
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
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Baocaotheonhakhoahoc.xlsx');
      });
    });
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

      CommonModule,
      TranslatePipeModule,
    ],
    providers: [],
    exports: [],
    declarations: [BaoCaoNKHComponent],
})
export class BaoCaoNKHModule { }
