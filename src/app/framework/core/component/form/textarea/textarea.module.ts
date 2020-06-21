// 工具包
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

// 组件
import { OmsTextareaComponent } from './textarea.component';

// 指令
import { ValidStyleModule } from '../../../directives/valid-style/valid-style.module';

@NgModule({
    declarations: [
        OmsTextareaComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ValidStyleModule,
        TranslateModule,
        FormsModule
    ],
    exports: [
        OmsTextareaComponent
    ]
})

export class OmsTextareaModule { }
