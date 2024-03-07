import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { formatMessage } from 'devextreme/localization';

@Pipe({
    name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  
    transform(value: any, args?: any): any {
        return formatMessage(value);
    }
}

@NgModule({
    imports: [],
    providers: [],
    exports: [TranslatePipe],
    declarations: [TranslatePipe],
})
export class TranslatePipeModule { }
