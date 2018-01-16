import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'modeloDataFilter'
})
export class ModeloFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.modelo.indexOf(query) > -1);
        }
        return array;
    }
}
