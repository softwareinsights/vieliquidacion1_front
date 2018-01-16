import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'estado_estado_idestado_fianzaDataFilter'
})
export class Estado_estado_idestado_fianzaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.estado_estado_idestado_fianza.indexOf(query) > -1);
        }
        return array;
    }
}
