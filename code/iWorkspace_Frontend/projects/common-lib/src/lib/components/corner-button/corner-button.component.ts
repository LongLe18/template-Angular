import { Component, Input, NgModule } from '@angular/core';
import { DxButtonModule} from 'devextreme-angular';
import { TranslatePipeModule } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

type CornerButton = {
    label: string,
    icon: string,
    type: string,
    onClick: () => void
}
@Component({
    selector: 'corner-button',
    templateUrl: './corner-button.component.html',
    styleUrls: ['./corner-button.component.scss'],
    providers: [],
})
export class CornerButtonComponent {

    @Input() items: CornerButton[];

    constructor() {}

}

@NgModule({
    imports: [
        DxButtonModule,
        TranslatePipeModule,
        CommonModule,
    ],
    providers: [],
    exports: [CornerButtonComponent],
    declarations: [CornerButtonComponent],
})
export class CornerButtonModule { }
