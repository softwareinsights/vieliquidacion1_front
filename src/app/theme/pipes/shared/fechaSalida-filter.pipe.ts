import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'fechaSalidaDataFilter'
})
export class FechaSalidaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.fechaSalida.indexOf(query) > -1);
        }
        return array;
    }
}
