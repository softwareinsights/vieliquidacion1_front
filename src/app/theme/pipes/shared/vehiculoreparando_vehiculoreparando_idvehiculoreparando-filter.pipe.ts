import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'vehiculoreparando_vehiculoreparando_idvehiculoreparandoDataFilter'
})
export class Vehiculoreparando_vehiculoreparando_idvehiculoreparandoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.vehiculoreparando_vehiculoreparando_idvehiculoreparando.indexOf(query) > -1);
        }
        return array;
    }
}
