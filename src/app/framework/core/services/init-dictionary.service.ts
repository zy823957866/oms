// 工具包
import { Injectable } from '@angular/core';

// 服务
import { DictionaryService } from './dictionary.service';
import { HttpApiService } from './http.service';
import { StructureService } from './structure.service';
import { Observable } from 'rxjs';

@Injectable()

export class InitDictionaryService {
    constructor(
        private dictionaryService: DictionaryService,
        private httpApiService: HttpApiService,
        private structureService: StructureService
    ){}

    //==========================公共方法==============================
    /**
     * 通过字典查下拉数据
    */
    getDicList(code: string, type: string='number'): Observable<any[]> {
        return this.dictionaryService.getDicListByDicCode(code, type);
    }

    /**
     * 通过structure查下拉数据
    */
    getStruList(code: string, type: string='number'): Observable<any[]> {
        return this.structureService.getDicListByDicCode(code, type);
    }


    //=========================获取列表数据==============================

    taxPayerList() { return this.getStruList('DIC_TAXPAYER', 'string'); }

    returnTaskStatusList() { return this.getDicList('DIC_TAXPAYER'); }

    // 是否启用
    isEnables() { return this.dictionaryService.getDicListByDicCode('IS_ENABLE') }

    // 用户还是系统
    userType() { return this.dictionaryService.getDicListByDicCode('USER_CATEGORY', 'string') }

    // 获取用户名称
    getUsersName() { return this.structureService.getDicListByDicCode('GET_USERS_NAME') };
}