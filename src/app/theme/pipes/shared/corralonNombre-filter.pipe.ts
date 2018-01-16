import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'corralonNombreDataFilter'
})
export class CorralonNombreFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.corralonNombre.indexOf(query) > -1);
        }
        return array;
    }
}
