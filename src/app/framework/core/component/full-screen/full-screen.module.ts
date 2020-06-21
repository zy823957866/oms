//工具包
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

//组件
import { OmsFullScreenComponent } from './full-screen.component';


@NgModule({
    declarations: [
        OmsFullScreenComponent
    ],

    imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule,
        FlexLayoutModule
    ],

    exports: [
        OmsFullScreenComponent
    ]
})

export class OmsFullScreenModule { }