import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'persona_propietarioDataFilter'
})
export class Persona_propietarioFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.persona_propietario.indexOf(query) > -1);
        }
        return array;
    }
}
