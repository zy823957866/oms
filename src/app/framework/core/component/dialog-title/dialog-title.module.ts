//工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

//组件
import { OmsDialogTitleComponent } from './dialog-title.component';

//模块
import { OmsFullScreenModule } from '../full-screen/full-screen.module';
import { OmsDialogDragModule } from '../../directives/dialog-drag/dialog-drag.module';

//指令
// import { LoadingDialogModule } from '../../directives/loading-dialog/loading-dialog.module';


@NgModule({
    declarations: [
        OmsDialogTitleComponent
    ],

    imports: [
        MatButtonModule, 
        MatIconModule,
        CommonModule,
        DragDropModule,
        OmsDialogDragModule,
        MatDialogModule,
        TranslateModule,
        OmsFullScreenModule,
        // LoadingDialogModule     
    ],

    exports: [
        OmsDialogTitleComponent
    ]
})

export class AntaDialogTitleModule {}