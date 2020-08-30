// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsUserComponent } from './user.component';

// 模块
import { OmsIconsModule } from 'src/app/framework/core/component/icon/icon.module';

// 路由
import { RoutingModule } from './user.routing';


@NgModule({
    declarations: [
        OmsUserComponent
    ],

    imports: [
        OmsIconsModule,
        RoutingModule
    ],

    entryComponents: [

    ]
})

export class OmsUserModule { }
