import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'direccionDataFilter'
})
export class DireccionFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.direccion.indexOf(query) > -1);
        }
        return array;
    }
}
