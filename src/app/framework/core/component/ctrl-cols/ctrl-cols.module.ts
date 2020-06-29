// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

// 组件
import { OmsCtrlColsComponent } from './ctrl-cols.component';
import { OmsAvailableColsComponent } from './available-cols/available-cols.component';

// 模块
import { OmsDialogTitleModule } from '../dialog-title/dialog-title.module';

@NgModule({
    declarations: [
        OmsCtrlColsComponent, 
        OmsAvailableColsComponent 
    ],
    exports: [ OmsCtrlColsComponent ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        OmsDialogTitleModule
    ],

    entryComponents: [
        OmsAvailableColsComponent
    ]
})

export class OmsCtrlColsModule { }
