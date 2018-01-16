import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'placaDataFilter'
})
export class PlacaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.placa.indexOf(query) > -1);
        }
        return array;
    }
}
