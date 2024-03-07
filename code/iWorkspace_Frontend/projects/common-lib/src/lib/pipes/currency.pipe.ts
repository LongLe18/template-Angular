import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'currecycustom',
})
export class CurrencyCustomPipe implements PipeTransform {
    
    constructor(private currencyPipe: CurrencyPipe) { }
    
    transform(value: any, code?: any): any {
        let newValue = '';
        if (value != null)
            newValue = this.currencyPipe.transform(value);
        return newValue.split('₫')[1] + code;
    }
}

@NgModule({
    imports: [],
    providers: [],
    exports: [CurrencyCustomPipe],
    declarations: [CurrencyCustomPipe],
})
export class CurrencyCustomPipeModule { }
