import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'fechaDataFilter'
})
export class FechaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.fecha.indexOf(query) > -1);
        }
        return array;
    }
}
