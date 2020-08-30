// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsResourceComponent } from './resource.component';

// 模块
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';
import { UploadModule } from 'src/app/framework/core/component/upload/upload.module';
import { DialogUploadModule } from 'src/app/framework/core/common/dialog-upload/dialog-upload.module';
import { ActivitiDesignModule } from 'src/app/framework/core/common/activiti-design/activiti-design.module';

// 路由
import { RoutingModule } from './resource.routing';


@NgModule({
    declarations: [
        OmsResourceComponent
    ],

    imports: [
        UploadModule,
        DialogUploadModule,
        OmsFormModule,
        ActivitiDesignModule,
        RoutingModule
    ],

    entryComponents: [

    ]
})

export class OmsResourceModule { }
