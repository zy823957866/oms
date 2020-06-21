// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

// 组件
import { OmsActionsComponent } from './actions.component';

// 模块
import { LoadingModule } from '../../../directives/loading/loading.module';

@NgModule({
    declarations: [ OmsActionsComponent ],
    exports: [ OmsActionsComponent ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        TranslateModule,
        LoadingModule,
    ]
})

export class OmsActionsModule { }
