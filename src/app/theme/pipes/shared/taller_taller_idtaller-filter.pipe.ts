import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'taller_taller_idtallerDataFilter'
})
export class Taller_taller_idtallerFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.taller_taller_idtaller.indexOf(query) > -1);
        }
        return array;
    }
}
