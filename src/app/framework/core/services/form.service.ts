// 工具包
import { Injectable } from "@angular/core";
import { FormGroup } from '@angular/forms';

@Injectable()

export class OmsFormService {
    
    constructor() {}


    // 检查是否有效
    formValueChange(formGroup: FormGroup, formErrors?: any, validationMes?: any) {
        if (!formGroup || !formErrors) { return; }
        for (const field in formErrors) {
            if (Object.prototype.hasOwnProperty.call(formErrors, field)) {
                formErrors[field] = '';
                const control = formGroup.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = validationMes[field];
                    for (const key in control.errors) {
                        if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                            formErrors[field] += messages ? (messages[key] + '') : '';
                        }
                    }
                }
            }
        }

        return formErrors;
    }

    // 触发表单输入框改变事件
    touchForms(formGroup: FormGroup) {
        for (const i in formGroup.controls) {
            formGroup.controls[i].markAsDirty();
            formGroup.controls[i].updateValueAndValidity();
        }
    }

    // 检查是否有错误信息
    isValid(formGroup: FormGroup, formErrors?: any): boolean {
        let _hasErr: boolean = true;
        for (const i in formGroup.controls) {
            formGroup.controls[i].markAsDirty();
            formGroup.controls[i].updateValueAndValidity();
        }
        if(formErrors){
            for (const key in formErrors) {
                if(formErrors[key]){ 
                    _hasErr = false;
                    return;
                }
            }
        }

        return _hasErr;
    }
}