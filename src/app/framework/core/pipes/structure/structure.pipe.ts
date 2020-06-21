import {Pipe, PipeTransform} from '@angular/core';
import { StructureService } from "../../services/structure.service";

@Pipe({name: 'structure'})
export class StructurePipe implements PipeTransform {

    constructor(private structureService: StructureService) {
    }

    transform(itemKey: any, dictionaryCode: string): any {
        return this.structureService.getDicValuByDicCode(dictionaryCode, itemKey);
    }

}