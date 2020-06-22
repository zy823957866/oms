// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// 组件
import { OmsConfirmComponent } from './confirm.component';

// 模块
import { AntaDialogTitleModule } from '../dialog-title/dialog-title.module';

@NgModule({
    declarations: [ OmsConfirmComponent ],
    exports: [ OmsConfirmComponent ],
    entryComponents: [ OmsConfirmComponent ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        AntaDialogTitleModule
    ]
})

export class OmsConfirmModule { }
