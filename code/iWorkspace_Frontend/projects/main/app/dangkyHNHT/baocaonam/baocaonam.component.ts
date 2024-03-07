import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
  DxDataGridModule, DxDataGridComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { formatMessage } from 'devextreme/localization';
import { BaoCaoNam, BaoCaoNamService, TranslatePipeModule,
  Filter, CommonConst, Notify, BreadCrumbModule, } from 'projects/common-lib/src/public-api';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';

@Component({
  templateUrl: './baocaonam.component.html',
  styleUrls: ['./baocaonam.component.scss'],
  providers: [BaoCaoNamService],
})
export class BaoCaoNamComponent {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
  
  formatMessage = formatMessage;

  readonly linkBreadCrumb = CommonConst.BAOCAONAM;

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
        };

        return lastValueFrom(this.service.LayDSBaoCaoNam(params))
          .then((data: BaoCaoNam[]) => {
            data.forEach((item: any, index: number) => {
              item.stt = (index + 1).toString()
            });
            return data;
          })
          .catch((error) => {console.log(error)});
      },
    })
  });

  constructor(private service: BaoCaoNamService, private router: Router) {
    // this.onEditClick = this.onEditClick.bind(this);
  }

  onRowPrepared(e){
    let commandExpand = e.rowElement.querySelector(".dx-command-expand");
    let sibling = commandExpand.nextSibling;
    let colspan = Number.parseInt(sibling.getAttribute("colspan"));
    
    if(!colspan) colspan = 1;
    sibling.setAttribute("colspan", colspan + 1);  
    commandExpand.remove();
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Báo cáo năm');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Baocaonam.xlsx');
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
      
      TranslatePipeModule,
    ],
    providers: [],
    exports: [],
    declarations: [BaoCaoNamComponent],
})
export class BaoCaoNamModule { }
