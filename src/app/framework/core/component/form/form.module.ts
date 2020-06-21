// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 组件
import { OmsFormComponent } from './form.component';

// 模块
import { OmsInputModule } from './input/input.module';
import { OmsSelectModule } from './select/select.module';
import { OmsTextareaModule } from './textarea/textarea.module';
import { OmsDatePickerModule } from './datePicker/datePicker.module';
import { OmsActionsModule } from './actions/actions.module';

@NgModule({
    declarations: [
        OmsFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OmsInputModule,
        OmsSelectModule,
        OmsTextareaModule,
        OmsDatePickerModule,
        OmsActionsModule
    ],
    exports: [
        OmsFormComponent
    ]
})

export class OmsFormModule { }
