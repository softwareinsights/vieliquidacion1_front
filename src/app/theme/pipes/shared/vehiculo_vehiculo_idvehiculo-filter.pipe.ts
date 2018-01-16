import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'vehiculo_vehiculo_idvehiculoDataFilter'
})
export class Vehiculo_vehiculo_idvehiculoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.vehiculo_vehiculo_idvehiculo.indexOf(query) > -1);
        }
        return array;
    }
}
