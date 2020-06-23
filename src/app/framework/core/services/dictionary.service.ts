import { Injectable } from '@angular/core';
import { SYSTEM_CONFIG } from "../config/system.config";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpApiService } from "./http.service";

const EXT_STR_ONE = 'XSTRONE';
const EXT_STR_TWO = 'XSTRTWO';
const EXT_STR_THREE = 'XSTRTHREE';

@Injectable()
export class DictionaryService {

    dictionaryMap: Map<string | number, Map<string | number, string>> = new Map<string, Map<string | number, string>>();

    constructor(private httpApiService: HttpApiService) {}

    getDicValuByDicCode(dicCode: string, dicKey: any): Observable<string> {
        let dicKeyStr = dicKey + '';
        let onDictionaryValuChange: BehaviorSubject<any> = new BehaviorSubject('');
        let dic = this.dictionaryMap.get(dicCode);
        // 扩展字段的map父对象
        let extMapObj = {};
        if (dic) {
            extMapObj = this.getExtSubMap(dicCode);
            onDictionaryValuChange.next(dic.get(dicKeyStr));
        } else {
            this.httpApiService.post(SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.QUERY_LIST_BY_DICT_CODE.VALUE, dicCode, data => {
                if (data === null) return;
                let subDictionaryMap = new Map<string | number, string>();
                // 字典返回后具体封装逻辑
                for (let i = 0; i < data.length; i++) {
                    subDictionaryMap.set(data[i].itemCode, data[i].itemValue);
                }
                this.dictionaryMap.set(dicCode, subDictionaryMap);
                dic = subDictionaryMap;
                extMapObj = this.initExtSubMap(dicCode, data);
                onDictionaryValuChange.next(dic.get(dicKeyStr));
            });
        }
        return onDictionaryValuChange;
    }

    getDicValuByDicCodeSynch(dicCode: string, dicKey: any): any {
        let dicKeyStr = dicKey + '';
        let dic = this.dictionaryMap.get(dicCode);
        if (dic) {
            return dic.get(dicKeyStr);
        }
        return null;
    }

    getDicListByDicCode(dicCode: any, keyType: string = 'number'): Observable<any[]> {
        //DIC_FP_DECLARE_INCOME_TYPE_AND_CODE
        let onDictionaryValuChange: BehaviorSubject<any> = new BehaviorSubject('');
        let dic = this.dictionaryMap.get(dicCode);
        // 扩展字段的map父对象
        let extMapObj = {};
        if (dic) {
            extMapObj = this.getExtSubMap(dicCode);
            onDictionaryValuChange.next(this.convertMap2Array(dic, keyType, extMapObj));
        } else {
            this.httpApiService.post(SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + SYSTEM_CONFIG.API.LIST.QUERY_LIST_BY_DICT_CODE.VALUE, dicCode, data => {
                if (data === null) return;
                let subDictionaryMap = new Map<string | number, string>();
                // 字典返回后具体封装逻辑
                for (let i = 0; i < data.length; i++) {
                    subDictionaryMap.set(data[i].itemCode, data[i].itemValue);
                }
                this.dictionaryMap.set(dicCode, subDictionaryMap);
                dic = subDictionaryMap;
                extMapObj = this.initExtSubMap(dicCode, data);
                onDictionaryValuChange.next(this.convertMap2Array(dic, keyType, extMapObj));
            });
        }
        return onDictionaryValuChange;
    }

    getDicListByPeriods(dicCode: any, keyType: string = 'number'): Observable<any[]> {
        let onDictionaryValuChange: BehaviorSubject<any> = new BehaviorSubject('');
        let dic = this.dictionaryMap.get(dicCode);
        // 扩展字段的map父对象
        let extMapObj = {};
        if (dic) {
            extMapObj = this.getExtSubMap(dicCode);
            onDictionaryValuChange.next(this.convertMap2Array(dic, keyType, extMapObj));
        } else {
            this.httpApiService.post(SYSTEM_CONFIG.APP.OPTION_SERVER + '/' + SYSTEM_CONFIG.API.VERSION.V1 + '/dictionaryItem' + '/queryListByPeriods.do', dicCode, data => {
                if (data === null) return;
                let subDictionaryMap = new Map<string | number, string>();
                // 字典返回后具体封装逻辑
                for (let i = 0; i < data.length; i++) {
                    subDictionaryMap.set(data[i].itemCode, data[i].itemValue);
                }
                this.dictionaryMap.set(dicCode, subDictionaryMap);
                dic = subDictionaryMap;
                extMapObj = this.initExtSubMap(dicCode, data);
                onDictionaryValuChange.next(this.convertMap2Array(dic, keyType, extMapObj));
            });
        }
        return onDictionaryValuChange;
    }

    getDicListByDicCodeSynh(dicCode: any, keyType: string = 'number'): any[] {

        let dic = this.dictionaryMap.get(dicCode);
        if (dic) {
            return this.convertMap2Array(dic, keyType);
        }
        return null;
    }

    convertMap2Array(map: Map<string | number, string>, keyType: string, extMapObj = null) {
        let dicArray = [];
        map.forEach((value, key) => {
            let keyPre = key;
            if (keyType === 'number') {
                key = parseInt(key + '');
            }
            let item = { DIC_KEY: key, DIC_VALUE: value };
            if (extMapObj) {
                item = this.setExtData(keyPre, item, extMapObj);
            }
            dicArray.push(item);
        });
        return dicArray;
    }

    getDicListFromTable(url, codeColumn, valueColumn, dicCode: any, searchDTO: any = { 'isEnable': 1, 'isDelete': 0 }): Observable<any[]> {
        let onDictionaryValuChange: BehaviorSubject<any> = new BehaviorSubject('');
        let dic = this.dictionaryMap.get(dicCode);
        if (dic) {
            onDictionaryValuChange.next(this.convertMap2Array(dic, 'string'));
        } else {
            this.httpApiService.post(url, searchDTO, data => {
                if (data === null) return;

                let subDictionaryMap = new Map<string | number, string>();
                //TODO 字典返回后具体封装逻辑
                for (let i = 0; i < data.records.length; i++) {
                    subDictionaryMap.set(data.records[i][codeColumn], data.records[i][valueColumn]);
                }
                this.dictionaryMap.set(dicCode, subDictionaryMap);
                dic = subDictionaryMap;
                //这里要发射数组[]
                onDictionaryValuChange.next(this.convertMap2Array(dic, 'string'));
            });
        }
        return onDictionaryValuChange;
    }


    /** 获取扩展字段的map父对象 */
    getExtSubMap(dicCode) {
        let extMapObj = {};
        // 扩展Str字段1的map
        let extStrOneSubDictMap = this.dictionaryMap.get(dicCode + EXT_STR_ONE);
        if (extStrOneSubDictMap) {
            extMapObj[EXT_STR_ONE] = extStrOneSubDictMap;
        }
        // 扩展Str字段2的map
        let extStrTwoSubDictMap = this.dictionaryMap.get(dicCode + EXT_STR_TWO);
        if (extStrTwoSubDictMap) {
            extMapObj[EXT_STR_TWO] = extStrTwoSubDictMap;
        }
        // 扩展Str字段3的map
        let extStrThreeSubDictMap = this.dictionaryMap.get(dicCode + EXT_STR_THREE);
        if (extStrThreeSubDictMap) {
            extMapObj[EXT_STR_THREE] = extStrThreeSubDictMap;
        }
        return extMapObj;
    }

    /** 初始化扩展字段的map父对象 */
    initExtSubMap(dicCode, data) {
        let extMapObj = {};
        // 扩展Str字段1的map
        let extStrOneSubDictMap = new Map<string | number, string>();
        // 扩展Str字段2的map
        let extStrTwoSubDictMap = new Map<string | number, string>();
        // 扩展Str字段3的map
        let extStrThreeSubDictMap = new Map<string | number, string>();
        for (let i = 0; i < data.length; i++) {
            // 扩展Str字段1的map设置
            if (data[i].extStringOne) {
                extStrOneSubDictMap.set(data[i].itemCode, data[i].extStringOne);
            }
            // 扩展Str字段2的map设置
            if (data[i].extStringTwo) {
                extStrTwoSubDictMap.set(data[i].itemCode, data[i].extStringTwo);
            }
            // 扩展Str字段3的map设置
            if (data[i].extStringThree) {
                extStrThreeSubDictMap.set(data[i].itemCode, data[i].extStringThree);
            }
        }
        // 设置扩展字段map到父对象中
        if (extStrOneSubDictMap.size > 0) {
            this.dictionaryMap.set(dicCode + EXT_STR_ONE, extStrOneSubDictMap);
            extMapObj[EXT_STR_ONE] = extStrOneSubDictMap;
        }
        if (extStrTwoSubDictMap.size > 0) {
            this.dictionaryMap.set(dicCode + EXT_STR_TWO, extStrTwoSubDictMap);
            extMapObj[EXT_STR_TWO] = extStrTwoSubDictMap;
        }
        if (extStrThreeSubDictMap.size > 0) {
            this.dictionaryMap.set(dicCode + EXT_STR_THREE, extStrThreeSubDictMap);
            extMapObj[EXT_STR_THREE] = extStrThreeSubDictMap;
        }
        return extMapObj;
    }

    /** 设置扩展字段值 */
    setExtData(keyPre, item, extMapObj) {
        if (extMapObj[EXT_STR_ONE]) {
            item[EXT_STR_ONE] = extMapObj[EXT_STR_ONE].get(keyPre);
        }
        if (extMapObj[EXT_STR_TWO]) {
            item[EXT_STR_TWO] = extMapObj[EXT_STR_TWO].get(keyPre);
        }
        if (extMapObj[EXT_STR_THREE]) {
            item[EXT_STR_THREE] = extMapObj[EXT_STR_THREE].get(keyPre);
        }
        return item;
    }
}
