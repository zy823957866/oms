import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { trim } from "lodash";
import { toPercent, toThousand } from '../../../utils/shared';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'oms-input',
    styleUrls: ['./input.component.scss'],
    templateUrl: './input.component.html'
})

export class OmsInputComponent {
    @ViewChild('inputArea') inputArea: any;

    // 输入框类型
    @Input() type: string='text';
    // 数字 step
    @Input() step: number=0.01;
    // 占位符
    @Input() placeholder: string='';
    // 绑定数据
    _value: any;
    number = 0;
    @Input() 
        get value() { return this._value }
        set value(v) {
            this.number++;
            this._value = v;
            if(this.number === 2 && v !== null) {
                setTimeout(() => {
                    if(this.percent) {
                        this._value = toPercent(v);
                    }else if(this.thousands) {
                        this._value = toThousand(v);
                    }
                    this._value = this.tranfer(v);
                });
            }            
        }
    // 标签名
    @Input() label: string='';
    // model名
    @Input() formCtrlName: string='';
    // 是否禁用
    @Input() disabled: boolean=false;
    // class
    @Input() inputClass: string='';
    //最小值
    @Input() min: number=0;
    // input间距
    @Input() gap: number=40;
    // 每行多少个input
    @Input() colSpan: number=3;
    //是否需要千分位转换
    @Input() thousands: boolean=false;
    //是否转换为百分比
    @Input() percent: boolean=false;
    //保留几位小数
    @Input() fixed: number=2;
    //最大长度
    @Input() maxlength:number;
    //右侧图标
    @Input() icon: string='';
    //form表单
    @Input() form: FormGroup;
    //是否为带点击的输入框
    @Input() originProp:any;
    // 错误信息
    @Input() set formErrors(v) {
        if(v) {
            this._formErrors = v;
            setTimeout(() => {
                this._required = ((this.form ? this.form.controls[this.formCtrlName].hasError('required') : true) && this._formErrors[this.formCtrlName] !== undefined ) 
                                ? true : false;
            });
        }
    }

    // 输入框改变回调
    @Output() inputV: any=new EventEmitter<any>();
    // 键盘事件
    @Output() keyupEvt: any=new EventEmitter<any>();
    // 点击事件回调
    @Output() clickInput: any=new EventEmitter<any>();
    // 图标点击事件
    @Output() iconClick: any=new EventEmitter<any>();
    @Output() inputBlur: any=new EventEmitter<any>();
    
    //是否必填
    _required: boolean=false;
    //是否处于焦点状态
    isFocus: boolean=false;
    //错误提示信息
    _formErrors: any={};


    // 输入内容变化
    inputChange(e) {
        if(this.isFocus === false && e) this.isFocus=true;
        if(this.type === 'number' && e.length>this.maxlength){
            this.inputArea.nativeElement.value = e = e.slice(0,this.maxlength);
        }

        this.inputV.emit({
            prop: this.formCtrlName,
            value: e
        })
    }

    // 回车事件
    keyUpBack(e) {
        this.keyupEvt.emit(e);
    }

    // 输入框点击事件
    inputClick() {
        this.clickInput.emit();
    }

    //图标点击事件
    iconAction() {
        this.iconClick.emit();
    }

    //数字最大长度
    onInput(v) {
        this.maxlength = 4;
        if(this.type === 'number' && v.length>this.maxlength){
            return v.slice(0,this.maxlength)
        }
        return v;
        
    }

    //焦点事件
    focus(e) {
        this.isFocus = true;

        //获取焦点[处理千分位]
        if(this.thousands) {
            e.target.value = e.target.value.replace(/,/g,'');
        }

        //百分比
        if(this.percent){
            e.target.value = (e.target.value.replace("%","") / 100).toFixed(4);
        }
    }

    clickClearIcon(e, value) {
        let _data = {
            prop: this.formCtrlName,
            value: null
        };

        if(this.originProp) {
            _data['originProp'] = this.originProp instanceof Array ? this.originProp : [this.originProp];
        }

        this.inputV.emit(_data);
    }

    //失去焦点[处理千分位]
    blur(e) {
        e.target.value = trim(e.target.value);

        e.target.value = this.tranfer(e.target.value);

        this.inputBlur.emit();

        setTimeout(() => {
			this.isFocus = false;
		},200);
    }

    tranfer(v) {
        //是否显示千分位
        if(this.thousands) {
            if(v.toString().indexOf ('.') !== -1) {
                let _s = v.toString();
                let _d = Number('0.' + _s.split('.')[1]).toFixed(2);

                v = ((_d === '1.00' ? (_s.split('.')[0] * 1 + 1) : _s.split('.')[0]) 
                    + '.' 
                    + ((_d === '0.00' || _d === '1.00') ? '00' : _d.split(".")[1])).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            }else {
                v = v.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            }
        }

        //是否显示百分比
        if(this.percent){
            v = (v * 100).toFixed(2) + '%';
        }

        return v;
    }
}
