import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cloneDeep, assign, isBoolean } from 'lodash';

// 服务
import { InitDictionaryService } from '../../services/init-dictionary.service';

// model
import { FormCbDataItem } from '../../models/form-cb.module';

@Component({
    selector: 'oms-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html'
})

export class OmsFormComponent {
    //用户自定义内容
    @Input() userDefine: Array<TemplateRef<any>>;

    // 表单
    @Input() formGroup: FormGroup; 

    // 错误信息
    @Input() formErrors:any;

    // 折叠状态时显示几个
    @Input() minShowColumn: number = 2;

    // 加载状态
    public loading: any;
    @Input() set loadingState(v){ this.loading = v };

    // 每行显示多少个
    public rowSpanNum: number = 5;
    @Input() set rowSpan(v) { this.rowSpanNum = v; }

    //form表单原始数据
    public formData: any = {
        layer: true,
        data: [],
		actions: []
    };
	@Input()
        set searchItems(v){
            // 处理表单数据
            this.handleItems(v);
        }

    // 回调
    @Output() formCb: any = new EventEmitter<any>();

    // 更多
    public more: boolean = false;


    // 处理表单数据
    handleItems(v) {
        // 计算每行显示多少个内容
        if(!this.rowSpanNum) {
            this.rowSpanNum = v.isLayer ? 3 : 5;
        }

        // 设置form数据
        this.formData = cloneDeep(v);

        // 默认是否显示更多(按钮)
        let showMore = v.actions.filter(item => item.type === 'hasMore') || [];
        this.more = showMore.length ? showMore[0].searchExpand : false;

        v.data.forEach(element => {
            //input 禁用处理
            if(element.type === 'input' && element.disabled) {
                this.formGroup.controls[element.prop].disable();
            }

            // 设置下拉值
            // if(element.type === 'select' && typeof element.options === 'string') {
            //     element.optionLists = this.initDic[element.options]();
            // }

            // //下拉数组字典赋值
            // if (element.type === 'select' && typeof element.options === 'string') {
            //     //通过管道过滤
            //     if (element.async !== false) element.options = this.initDic[element.options]();
            //     //通过其他接口过滤
            //     else {
            //         this.initDic[element.options]().then(res => {
            //             element.selectOptions = res;
            //         })
            //     }
            // }
        });
    }

    constructor(
        private initDic: InitDictionaryService
    ) {}

    // 子组件回调
    vChange(e: FormCbDataItem | string, item: any) {
        let backData = assign({}, e);
        // 时间回调，因为涉及到区间，需要特殊处理
        if(typeof e !== 'string' && item.type === 'date') {
            backData[item.prop[0]] = e.start;
            if(!item.single){
                backData[item.prop[1]] = e.start;
            }
            delete backData.start;
            delete backData.end;
        }

        this.formCb.emit({
            data: backData,
            item: item
        });
    }

    // 失焦事件
    inputBlur(item) {
        if(item && item.blurFun) this.formCb.emit({
            data: item.blurFun
        });
    }

    // 回车查询
    enterToSearh(e) {

    }

    // 操作功能回调
    actionsCb(e) {
        if(isBoolean(e)) {
            // 展开折叠功能
            this.more = e;
        }else {
            this.formCb.emit({ data: e })
        }
    }
}