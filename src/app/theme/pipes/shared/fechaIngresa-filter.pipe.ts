import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'fechaIngresaDataFilter'
})
export class FechaIngresaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.fechaIngresa.indexOf(query) > -1);
        }
        return array;
    }
}
