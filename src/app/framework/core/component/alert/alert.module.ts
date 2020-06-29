// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// 组件
import { OmsAlertComponent } from './alert.component';

// 模块
import { OmsDialogTitleModule } from '../dialog-title/dialog-title.module';

@NgModule({
    declarations: [ OmsAlertComponent ],
    exports: [ OmsAlertComponent ],
    entryComponents: [ OmsAlertComponent ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        OmsDialogTitleModule
    ]
})

export class OmsAlertModule {  }
