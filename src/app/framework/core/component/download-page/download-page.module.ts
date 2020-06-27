// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

// 组件
import { OmsDownloadPageComponent } from './download-page.component';

@NgModule({
    declarations: [ OmsDownloadPageComponent ],
    exports: [ OmsDownloadPageComponent ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        CommonModule
    ]
})

export class OmsDownloadPageModule { }
