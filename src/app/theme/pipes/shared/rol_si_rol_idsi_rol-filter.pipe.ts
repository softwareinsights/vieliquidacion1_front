import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'rol_si_rol_idsi_rolDataFilter'
})
export class Rol_si_rol_idsi_rolFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.rol_si_rol_idsi_rol.indexOf(query) > -1);
        }
        return array;
    }
}
