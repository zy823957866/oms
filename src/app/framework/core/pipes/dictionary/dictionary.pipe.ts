//工具包
import {Pipe, PipeTransform} from '@angular/core';
//服务
import {DictionaryService} from "../../services/dictionary.service";


@Pipe({name: 'dictionary'})


export class DictionaryPipe implements PipeTransform {

    constructor(private dictionaryService: DictionaryService) { }

    transform(itemKey: any, dictionaryCode: string): any {
        return this.dictionaryService.getDicValuByDicCode(dictionaryCode, itemKey);
    }

}