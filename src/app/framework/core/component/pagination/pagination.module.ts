/**
 * @DESC 分页器 MODULE
 * @AUTH CREATE BY ZHOUYONG
 * @DATE 2019.04.17
 */
//工具包
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// 组件
import { AppPaginationComponent } from './pagination.component';


@NgModule({
    declarations: [
        AppPaginationComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    providers: [
    ],
    exports: [
        AppPaginationComponent
    ]
})


export class PaginationModule { }