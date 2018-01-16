import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'enviotaller_enviotaller_idenviotallerDataFilter'
})
export class Enviotaller_enviotaller_idenviotallerFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.enviotaller_enviotaller_idenviotaller.indexOf(query) > -1);
        }
        return array;
    }
}
