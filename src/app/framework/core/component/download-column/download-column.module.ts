// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// 组件
import { OmsDownloadColumnComponent } from './download-column.component';

// 模块
import { OmsDialogTitleModule } from '../dialog-title/dialog-title.module';

@NgModule({
    declarations: [ OmsDownloadColumnComponent ],
    exports: [ OmsDownloadColumnComponent ],
    imports: [
        MatCheckboxModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        OmsDialogTitleModule
    ]
})

export class OmsDownloadColumnModule { }
