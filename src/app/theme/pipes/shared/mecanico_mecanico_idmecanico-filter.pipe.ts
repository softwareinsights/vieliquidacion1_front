import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'mecanico_mecanico_idmecanicoDataFilter'
})
export class Mecanico_mecanico_idmecanicoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.mecanico_mecanico_idmecanico.indexOf(query) > -1);
        }
        return array;
    }
}
