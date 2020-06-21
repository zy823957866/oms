/*
 * @Desc: 时间控件
 * @Date: 2019-07-01 22:20:05
 * @Author: JHON
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { assign } from 'lodash';

//服务
import { MomentService } from '../../../services/moment.service';
import { OmsDatepicker } from '../../../models/datepicker.model';

declare let $;

// 定义国际化
const DATE_LOCAL = {
    applyLabel: '确定',
    cancelLabel: '清空',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom',
    daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
}

// 定义最大时间范围(当前时间 + 100 年)
const MAX_RANGE_TIME = new Date().getFullYear() + 100;


@Component({
    selector: 'oms-datepicker',
    templateUrl: './datePicker.component.html',
    styleUrls: ['./datePicker.component.scss']
})

export class OmsDatePickerComponent {
    //form表单
    @Input() form;
    //开始时间
    @Input() 
        set startTime(v) {
            if(v instanceof Date) {
                this._startTime = v.getTime();
            }else {
                this._startTime = v
            }
            this.updateDate();
        };
    //结束时间
    @Input() 
        set endTime(v) {
            if(v instanceof Date) {
                this._endTime = v.getTime();
            }else {
                this._endTime = v
            }
        };
    //是否需要显示时分秒
    @Input() timePicker: boolean=false;
    //name
    @Input() name: string='daterange';
	//打开弹框的位置
    @Input() opens: string="left";
    // 最小时间
    @Input() minDate: any;
    // 最大时间
    @Input() maxDate: any;
    // 是否禁用
    @Input() disabled: boolean=false;
    //时间类型
    @Input() set dateType(v) {
        if(v) {
			this.originDateType = v;
            this.newDateType = v
                .replace(/y/g, 'Y')
                .replace(/M/g, 'M')
                .replace(/d/g, 'D')
        }
    }
    //标签名
    @Input() label: string="";
    //是否为单个选择
    @Input() singleDatePicker: boolean=false;
    // 错误信息
    @Input() set formErrors(v) {
        if(v) {
            this._formErrors = v;
            this._required = ((this.form ? this.form.controls[this.name].hasError('required') : true) && this._formErrors[this.name] !== undefined ) 
                ? true : false;
        }
    }

    //数据改变
    @Output() timeChange: any=new EventEmitter<any>();

    //解析后的时间格式
	private newDateType: any="YYYY-MM-DD";
	//原始数据格式
    public originDateType: any='yyyy-MM-dd';
    //开始时间
    public _startTime: any;
    //结束时间
    public _endTime: any;
    //输入框内容
    public selectDateDesc: any;
    //是否必填
    _required: boolean=false;
    //错误提示信息
    public _formErrors: any={};

    constructor(
        private _moment: MomentService
    ) {}

    updateDate() {
        let self = this;
        setTimeout(() => {
            const el = $(`input[name="${this.name}"]`);
            const baseOptions = {
                autoUpdateInput: Boolean(this._startTime),
                singleDatePicker: this.singleDatePicker,
                showDropdowns:true,
                minYear:1970,
                minDate: new Date(this.minDate),
                maxDate: new Date(this.maxDate),
                maxYear: MAX_RANGE_TIME,
                locale: assign({}, DATE_LOCAL, { format: this.newDateType})
            }
            let options: OmsDatepicker={};

            // 设置开始时间
            if(this._startTime) options.startDate = this._startTime;

            // 设置结束时间
            if(this._endTime) options.endDate = this._endTime;

            // 显示时分秒
            if(this.timePicker) {
                options = assign({}, options, {
                    timePicker: true,
                    timePickerIncrement: true,
                    timePicker24Hour: true,
                    timePickerSeconds: true
                });
            }

            // 设置基本属性
            el.daterangepicker(Object.assign({}, baseOptions, options));

           // 点击事件用此种方法，解决无法选择今天的bug
            el.on('apply.daterangepicker', function(ev, picker) {
                $(this).val(
                    self.singleDatePicker 
                    ? self.patchDateFlag(new Date(picker.startDate)) 
                    : self.patchDateFlag(new Date(picker.startDate), new Date(picker.endDate))
                );
            });

            // 清空时间
            el.on('cancel.daterangepicker', function(ev, picker) {
                this.singleDatePicker ? self.patchDateFlag('') : self.patchDateFlag('', '')
                $(this).val('');
            });
        });
    }

    //修改时间壳数据
    patchDateFlag(start, end: any=null) {
        let _start = this._moment.dateFormat(this.originDateType, start);
        let _end   = this._moment.dateFormat(this.originDateType, end);

        this.selectDateDesc = end !== null ? (_start + ' - ' + _end) : _start;

        this.timeChange.emit(
            end !== null 
                ? { prop: this.name, start: _start, end: _end }
                : { prop: this.name, start: _start }
        );

        //初始化时间壳
        return this.selectDateDesc;
    }

    // 阻止事件
    // 键盘事件, 阻止输入
    keyUpCb(e) {
        e.target.value = this.selectDateDesc || '';
    }
}