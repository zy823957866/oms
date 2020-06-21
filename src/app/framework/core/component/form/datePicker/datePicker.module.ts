//工具包
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//组件
import { OmsDatePickerComponent } from './datePicker.component';

//服务
import { MomentService } from '../../../services/moment.service';

// 模块
import { ValidStyleModule } from '../../../directives/valid-style/valid-style.module';


@NgModule({
    declarations: [
        OmsDatePickerComponent
    ],

    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        ValidStyleModule
    ],

    providers: [
        MomentService
    ],

    exports: [
        OmsDatePickerComponent
    ]
})


export class OmsDatePickerModule {}