// 工具包
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'oms-textarea',
    styleUrls: ['./textarea.component.scss'],
    templateUrl: './textarea.component.html'
})

export class OmsTextareaComponent {
    // 占位符
    @Input() placeholder: string='';
    // 绑定数据
    @Input() value: any;
    // 标签名
    @Input() label: string='';
    // model名
    @Input() formCtrlName: string='';

    _height: string='1.5rem';
    // 高度
    @Input() set height(v){
        this._height = parseInt(v) / 100 + 'rem';
    };
    // 是否禁用
    @Input() disabled: boolean=false;
    // class
    @Input() inputClass: string='';
    //最大长度
    @Input() maxlength: number;
    //form表单
    @Input() form;

    // 错误信息
    @Input() set formErrors(v) {
        if(v) {
            this._formErrors = v;
            
            this._required = ((this.form ? this.form.controls[this.formCtrlName].hasError('required') : true) && this._formErrors[this.formCtrlName] !== undefined ) 
                ? true : false;
        }
    }
    
    // 输入框改变回调
    @Output() textareaV: any=new EventEmitter<any>();

    //是否必填
    _required: boolean=false;
    //错误提示信息
    _formErrors: any={};

    // 输入内容变化
    inputChange(e) {
        this.textareaV.emit({
            prop: this.formCtrlName,
            value: e
        })
    }
}