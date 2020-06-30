// 工具包
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { drop } from 'lodash';
import { BehaviorSubject } from 'rxjs';

// 服务
import { HttpApiService } from './http.service';

// 头部配置信息
import { headerCodeConfig, actionTips, actions } from '../utils/header-config';

@Injectable()

export class OmsPageCodeService {
    //请求table THEAD部分的API
    public url: string = '/api-option/v1/viewCloumn/queryClounmnByTable.do';
    
    constructor(
        public router: Router,
        public httpSer: HttpApiService
    ) {}

    getUrlCode(layer: any = null): string {
        let _url = this.router.url;
        let code = drop(_url.split('/'), 2).join('_');

        if(layer) {
            code = code + '_' + layer;
        }

        return code;
    }

    getPageCode(layer) {
        let headConfig = headerCodeConfig[this.getUrlCode(layer)];

        return headConfig ? headConfig.code : '';
    }



    getTableHeader(layer) {
        let headConfig = headerCodeConfig[this.getUrlCode(layer)];

        //定义一个观察者
        let headeCodeSub$: BehaviorSubject<any> = new BehaviorSubject('');

        if(headConfig) {
            this.httpSer.post(this.url, { tableCode: headConfig.code }, res => {
                if(res) {
                    let tableFrame = [];
    
                    //判断是否添加checkbox
                    if (headConfig.hasCheck) {
                        tableFrame.push({ type: 'checkbox' });
                    }
    
                    //构造后台传过来的THEAD数组
                    if (res.length > 0) {
                        for (let item of res) {
                            let pipes: any={};
                            let type = this.typeOfDictCode(item.cloumnType);
    
                            if (type !== null && item.dictCode !== undefined) {
                                pipes[type] = item.dictCode;
                            } else if (type !== null && item.dictCode === undefined) {
                                if(type === 'date') {
                                    pipes[type] = 'yyyy-MM-dd'
                                }else{
                                    pipes = type;
                                }
                            } else {
                                pipes = null;
                            }
    
                            tableFrame.push({
                                name: item.cloumnName,
                                enName: item.cloumnEngName || item.cloumnName,
                                prop: item.cloumnCode,
                                ifOrder: item.ifOrder,
                                pipes: pipes,
                                textAlign: item.textAlign === undefined ? null : item.textAlign,
                                width: item.width || null,
                                shows: item.displayCond === undefined ? null : item.displayCond,
                                ifDisplay: item.ifDisplay === 0 ? 0 : 1,
                                isCheck: item.ifDisplay === 0 ? false : true,
                            })
                        }
                    }
    
                    //设置按钮
                    if (headConfig.actions && headConfig.actions.length > 0) {
                        tableFrame.push(this.getActionBtn(headConfig.actions, headConfig));
                    }
    
                    headeCodeSub$.next(tableFrame);
                }
            });
        }

        return headeCodeSub$;
    }

    // 设置操作按钮
    getActionBtn(actionBtns, headConfig) {
		let arr = [];
		let auth = [];
		actionBtns.forEach((item, index) => {
			let _item = item.btn && item.btn.split('_') || [];
			let _name = _item.length > 1 ? actionTips[_item[1]] : actions[_item[0]].name;
			
			if(item.auth instanceof Array) {
				auth = auth.concat(item.auth);
			}else {
				auth.push(item.auth);
			}
			
			arr.push(Object.assign({}, actions[_item[0]], { name: _name }, item));
		})

        //若传入shrink为false或者不传，则将所有的按钮放在一个按钮里面
        return { type: 'actions', shrink: Boolean(headConfig.shrink), auth: auth, name: '操作', actions: arr };
	}


    //解析字典值
	typeOfDictCode(code) {
		switch (code) {
			case 0: return 'date';
			case 1: return 'dictionary';
			case 2: return 'normal';
			case 3: return 'uppercase';
			case 4: return 'lowercase';
			case 5: return 'percent';
			case 6: return 'json';
			case 7: return 'structure';
			case 8: return 'round';
			case 9: return 'interval';
			case 10: return 'userDefine';
			case 11: return 'number';
			default: return null;
		}
	}
}