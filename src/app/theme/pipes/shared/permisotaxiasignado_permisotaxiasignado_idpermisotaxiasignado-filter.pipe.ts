import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignadoDataFilter'
})
export class Permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignadoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado.indexOf(query) > -1);
        }
        return array;
    }
}
