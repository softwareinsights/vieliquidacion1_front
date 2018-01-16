import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'chofer_chofer_idchoferDataFilter'
})
export class Chofer_chofer_idchoferFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.chofer_chofer_idchofer.indexOf(query) > -1);
        }
        return array;
    }
}
