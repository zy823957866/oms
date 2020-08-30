// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

// 组件
import { DialogUploadComponent } from './dialog-upload.component';

// 服务
import { MessageService } from '../../services/message.service';
import { HttpApiService } from '../../services/http.service';

// 模块
import { UploadModule } from '../../component/upload/upload.module';
import { OmsDialogTitleModule } from '../../component/dialog-title/dialog-title.module';
import { OmsActionsModule } from '../../component/form/actions/actions.module';


@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        UploadModule,
        OmsDialogTitleModule,
        OmsActionsModule
    ],
    providers: [
        MessageService,
        HttpApiService
    ],
    declarations: [
        DialogUploadComponent
    ],
    entryComponents: [
        DialogUploadComponent
    ]
})

export class DialogUploadModule { }
