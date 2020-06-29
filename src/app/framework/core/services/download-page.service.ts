// 导出页面，包括导出当前页、选中数据、全部页面三种
// 工具包
import { Injectable } from "@angular/core";

// 服务
import { MomentService } from './moment.service';
import { DictionaryService } from './dictionary.service';
import { StructureService } from './structure.service';

// 配置
import { STRUCTURE_CONFIG } from '../config/structure.config';

@Injectable()

export class OmsDownloadPageService {

    constructor(
        private _moment: MomentService,
        public dictionaryService: DictionaryService,
        public structureService: StructureService
    ){}

    //构造CSV数据
    public convert(data, opts){
        let _data=[];
        
        if(opts) {
            opts.forEach(item => {
                //只导出选中的数据
                if(!item.ifDisplay) return;

                _data[0] = _data[0] || [];
                _data[0].push(item.name);

                data.forEach((child, index) => {
                    _data[index+1] = _data[index+1] || {};
                    if(item.pipes) {
                        if(item.pipes.date) {
                            //日期
                            _data[index+1][item.name] = this.dataFormat(child[item.prop] ? new Date(child[item.prop]) : '',item.pipes.date);
                        
                        } else if(item.pipes.dictionary){
                            //字典
                            _data[index+1][item.name] = this.dictionaryService.getDicValuByDicCodeSynch(item.pipes.dictionary,child[item.prop]) || '';
                        
                        } else if(item.pipes.unit) {
                            //加上单位
                            _data[index+1][item.name] = '' + child[item.prop] + item.pipes.unit;
                        
                        }else if(item.pipes.structure) {
                            let _codeSynh = this.structureService.getDicListByDicCodeSynh(item.pipes.structure);
                            let _synh = (_codeSynh ? _codeSynh : []).filter(node => child[item.prop] === node.DIC_KEY);
                            _data[index+1][item.name] = _synh && _synh.length > 0 ? _synh[0].DIC_VALUE : ''
                        } else if(item.pipes.percent) {
                            //转为百分比
                            _data[index+1][item.name] = child[item.prop] ? (child[item.prop] * 100).toFixed(2) + '%' : '';
                        
                        } else if(item.pipes.round !== undefined) {
                            //四舍五入
                            _data[index+1][item.name] = (child[item.prop] === null || child[item.prop] === undefined || child[item.prop] === '') ? '' : child[item.prop].toFixed(item.pipes.round)
                       
                        }else if(item.pipes.number !== undefined || item.pipes === 'number') {
                            //数字
                            _data[index+1][item.name] = child[item.prop] === null ? 0 : child[item.prop];
                            if( _data[index+1][item.name] != null){
                              _data[index+1][item.name] = _data[index+1][item.name].toFixed(item.pipes.number || 2);
                            }
                        }else if(item.pipes.userDefine !== undefined) {
                            //自定义内容
                            _data[index+1][item.name] = child[item.prop] || '';
                        }
                    } else if(item.exportType === 'number'){
                        //数字
                        _data[index+1][item.name] = "\t" + (child[item.prop] || '');
                    
                    }else if(item.type !=='checkbox' && item.type !== 'actions' ) {
                        //其它
                        if(child[item.prop] !== undefined && child[item.prop] !== null) {
                            _data[index+1][item.name] = ('' + child[item.prop]).replace(/\,/g,'，');
                        }else{
                            _data[index+1][item.name] = '';
                        }
                    }
                })
            })
        }

        //删除第一个元素
        _data.splice(0,1);

        return _data;
    }

    //解析时间
    private dataFormat(data,type: any='yyyy-MM-dd') {
        if(data instanceof Date) {
            type = type.replace(/H/g, 'h');
            return this._moment.dateFormat(type, data);
        }else {
            return data;
        } 
    }

    // 下载全部搜索数据所需的列信息
    getFields(data) {
        let expFields = [];

        for (let item of data) {

            if(item.type !== 'checkbox' && item.type !== 'actions' && item.ifDisplay) {
                let fieldObj = {};
                // 字段名
                fieldObj['propertyName'] = item.prop;
                fieldObj['head'] = item.name;

                //字典
                if (item.pipes && item.pipes.dictionary) {
                    fieldObj['dictCode'] = item.pipes.dictionary;
                }
                
                //structure
                if(item.pipes && item.pipes.structure) {
                    fieldObj['struCode'] = item.pipes.structure;
                    fieldObj['struKey'] = STRUCTURE_CONFIG[item.pipes.structure].VALUE_COLUMN
                }

                //date
                if (item.pipes && item.pipes.date) {
                    fieldObj['format'] = item.pipes.date;
                }

                //number
                if (item.pipes && item.pipes.number) {
                    fieldObj['format'] = item.pipes.number;
                }

                expFields.push(fieldObj);
            }
        }

        return expFields;
    }
}