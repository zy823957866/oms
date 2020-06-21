// 工具包
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// 组件
import { OmsInputComponent } from './input.component';

// 指令
import { ValidStyleModule } from '../../../directives/valid-style/valid-style.module';

@NgModule({
    declarations: [
        OmsInputComponent
    ],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        TranslateModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ValidStyleModule
    ],
    exports: [
        OmsInputComponent
    ]
})

export class OmsInputModule { }
