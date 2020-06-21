import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpApiService} from "./http.service";
import {STRUCTURE_CONFIG} from "../config/structure.config";

@Injectable()
export class StructureService {

    structureMap: Map<string | number, Map<string | number, object>> = new Map<string, Map<string | number, object>>();

    constructor(private httpApiService: HttpApiService) {}

    getDicValuByDicCode(dicCode: string='', dicKey: any=''): Observable<string> {
        let dicKeyStr = dicKey + '';
        let onStructureValuChange: BehaviorSubject<any> = new BehaviorSubject('');
        let dic = this.structureMap.get(dicCode);
        let dicConfig = STRUCTURE_CONFIG[dicCode];
        if (dic) {
             onStructureValuChange.next(dic.get(dicKeyStr) && dic.get(dicKeyStr)[dicConfig.VALUE_COLUMN]);
        } else {
            if (!dicConfig) {
                console.error('Structure dictionary ' + dicCode + ' do not exist, please config it in structure config');
            }
            let searchDTO = null;
            if (dicConfig.SEARCH_DTO) {
                searchDTO = dicConfig.SEARCH_DTO;
            } else {
                searchDTO = STRUCTURE_CONFIG.SEARCH_DTO;
            }
            this.httpApiService.post(dicConfig.URL, searchDTO, data => {
                if(data === null) return;
                let subStructureMap = new Map<string | number, object>();
                let _data = data instanceof Array ? data : data.records;
                // 字典返回后具体封装逻辑
                for (let i = 0; i < _data.length; i++) {
                    subStructureMap.set(_data[i][dicConfig.CODE_COLUMN], _data[i]);
                }
                this.structureMap.set(dicCode, subStructureMap);
                dic = subStructureMap;

                dic.get(dicKeyStr) 
                    ? onStructureValuChange.next(dic.get(dicKeyStr)[dicConfig.VALUE_COLUMN])
                    : onStructureValuChange.next(null);
            });
        }

        return onStructureValuChange;
    }

    getDicValuByDicCodeSynch(dicCode: string, dicKey: any): any {
        
        let dicKeyStr = dicKey + '';
        let dic = this.structureMap.get(dicCode);
        if (dic) {
            return dic.get(dicKeyStr);
        }
        return null;
    }

    getDicListByDicCode(dicCode: any, keyType: string = 'string', query: any = null, params: any=null): Observable<any[]> {
        let onStructureValuChange: BehaviorSubject<any> = new BehaviorSubject('');
        let dic = this.structureMap.get(dicCode);
        if (dic) {
            onStructureValuChange.next(this.convertMap2Array(dic, keyType, dicCode, query));
        } else {
            let dicConfig = STRUCTURE_CONFIG[dicCode];
            if (!dicConfig) {
                console.error('Structure dictionary "' + dicCode + '" do not exist, please config it in structure config');
            }
            let searchDTO = null;
            if(params) {
                searchDTO = params;
            }else {
                if (dicConfig.SEARCH_DTO) {
                    searchDTO = dicConfig.SEARCH_DTO;
                } else {
                    searchDTO = STRUCTURE_CONFIG.SEARCH_DTO;
                }
            }
            
            this.httpApiService.post(dicConfig.URL, searchDTO, data => {
                if(data === null) return;
                let subStructureMap = new Map<string | number, object>();
                // 字典返回后具体封装逻辑
                let _data = data instanceof Array ? data : data.records;

                for (let i = 0; i < _data.length; i++) {
                    subStructureMap.set(_data[i][dicConfig.CODE_COLUMN], _data[i]);
                }
                this.structureMap.set(dicCode, subStructureMap);
                dic = subStructureMap;
                onStructureValuChange.next(this.convertMap2Array(dic, keyType, dicCode,query));
            });
        }
        return onStructureValuChange;
    }


    getDicListByDicCodeSynh(dicCode: any, keyType: string = 'string'): any[] {
        let dic = this.structureMap.get(dicCode);
        if (dic) {
            return this.convertMap2Array(dic, keyType, dicCode);
        }
        return null;
    }

    convertMap2Array(map: Map<string | number, object>, keyType: string, dicCode: any, query: any = null) {
        let dicArray = [];
        let dicConfig = STRUCTURE_CONFIG[dicCode];
        map.forEach((value, key) => {
            if (keyType === 'number') {
                key = parseInt(key + '');
            }
            if(query){
                let flag = true;
                for(var queryKey in query){
                    let queryValue = query[queryKey];
                    if(queryValue == undefined ||queryValue == null){
                        continue;
                    }
                    let resultValue = value[queryKey];
                    flag = flag && (queryValue == resultValue);
                }
                if(flag){
                    dicArray.push({DIC_KEY: key, DIC_VALUE: value[dicConfig.VALUE_COLUMN]});
                }
            }else{
                dicArray.push({DIC_KEY: key, DIC_VALUE: value[dicConfig.VALUE_COLUMN]});
            }
        });

        return dicArray;
    }

}