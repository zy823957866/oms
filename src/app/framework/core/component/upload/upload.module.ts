// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// 组件
import { UploadComponent } from './upload.component';

// 模块
import { OmsActionsModule } from '../form/actions/actions.module';

// 服务
import { MessageService } from '../../services/message.service';
import { HttpApiService } from '../../services/http.service';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        OmsActionsModule,
        NgxUploaderModule
    ],
    providers: [
        MessageService,
        HttpApiService
    ],
    declarations: [
        UploadComponent
    ],
    exports: [
        UploadComponent
    ]
})
export class UploadModule { }
