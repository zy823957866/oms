// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'; 

// 组件
import { OmsSelectComponent } from './select.component';

@NgModule({
    declarations: [ OmsSelectComponent ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxMatSelectSearchModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule
    ],
    exports: [ OmsSelectComponent ]
})

export class OmsSelectModule { }
