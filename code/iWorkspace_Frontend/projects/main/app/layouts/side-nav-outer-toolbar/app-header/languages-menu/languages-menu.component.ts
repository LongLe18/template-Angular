import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { TranslationService } from 'projects/common-lib/src/public-api';
import { DxListModule, DxListTypes } from 'devextreme-angular/ui/list';

@Component({
    selector: 'languages-menu',
    templateUrl: 'languages-menu.component.html',
    styleUrls: ['./languages-menu.component.scss'],
})

export class LanguagesMenuComponent {
    @Input()
    menuItems: any;

    locale: string;
    flagIcon: string;

    constructor(private TranslationService: TranslationService) {
        this.locale = TranslationService.getCurrentLanguage();
        this.flagIcon = `assets/icons/${this.locale}.png`;
    }

    handleListItemClick(e: DxListTypes.ItemClickEvent) {
        this.TranslationService.setLocale(e.itemData.value);
        window.location.reload();
    }
}

@NgModule({
    imports: [
      DxDropDownButtonModule,
      CommonModule,
      DxListModule,
    ],
    declarations: [LanguagesMenuComponent],
    exports: [LanguagesMenuComponent],
  })
  export class LanguagesMenuModule { }
