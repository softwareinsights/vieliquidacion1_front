import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'motivoDataFilter'
})
export class MotivoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.motivo.indexOf(query) > -1);
        }
        return array;
    }
}
