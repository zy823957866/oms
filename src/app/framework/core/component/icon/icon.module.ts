// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

// 组件
import { OmsIconsComponent } from './icon.component';

@NgModule({
    declarations: [
        OmsIconsComponent
    ],
    exports: [
        OmsIconsComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule
    ]
})

export class OmsIconsModule { }
