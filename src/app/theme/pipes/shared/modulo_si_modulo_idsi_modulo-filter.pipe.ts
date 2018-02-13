import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'modulo_si_modulo_idsi_moduloDataFilter'
})
export class Modulo_si_modulo_idsi_moduloFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.modulo_si_modulo_idsi_modulo.indexOf(query) > -1);
        }
        return array;
    }
}
