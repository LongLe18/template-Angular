import { Component, Input, NgModule } from '@angular/core';

import { TranslatePipeModule } from 'projects/common-lib/src/public-api';


@Component({
    selector: 'breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    providers: [],
})
export class BreadCrumbComponent {

    @Input() label: string;

    @Input() link: string;

}

@NgModule({
    imports: [
        TranslatePipeModule,
    ],
    providers: [],
    exports: [BreadCrumbComponent],
    declarations: [BreadCrumbComponent],
})
export class BreadCrumbModule { }
