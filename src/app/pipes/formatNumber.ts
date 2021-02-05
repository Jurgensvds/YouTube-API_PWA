import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatViews'
})

export class FormatViews implements PipeTransform {
    constructor(private decimalPipe: DecimalPipe){}

    transform(value: string | undefined, digits?: any) {
        return value ? (value.length > 6 ? `${this.formatNumber(value, digits)}M` : value) : '';
    }

    formatNumber(number:string, digits?: any){
        return this.decimalPipe.transform(parseInt(number)/1000000, digits)
    }
}