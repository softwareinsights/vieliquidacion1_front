import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'refaccion_refaccion_idrefaccionDataFilter'
})
export class Refaccion_refaccion_idrefaccionFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.refaccion_refaccion_idrefaccion.indexOf(query) > -1);
        }
        return array;
    }
}
