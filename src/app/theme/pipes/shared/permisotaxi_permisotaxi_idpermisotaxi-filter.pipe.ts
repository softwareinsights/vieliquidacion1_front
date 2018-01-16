import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'permisotaxi_permisotaxi_idpermisotaxiDataFilter'
})
export class Permisotaxi_permisotaxi_idpermisotaxiFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.permisotaxi_permisotaxi_idpermisotaxi.indexOf(query) > -1);
        }
        return array;
    }
}
