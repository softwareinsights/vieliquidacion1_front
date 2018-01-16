import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'marcaDataFilter'
})
export class MarcaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.marca.indexOf(query) > -1);
        }
        return array;
    }
}
