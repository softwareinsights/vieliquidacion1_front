import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'descripcionDataFilter'
})
export class DescripcionFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.descripcion.indexOf(query) > -1);
        }
        return array;
    }
}
