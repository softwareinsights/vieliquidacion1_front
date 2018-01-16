import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'conceptoDataFilter'
})
export class ConceptoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.concepto.indexOf(query) > -1);
        }
        return array;
    }
}
