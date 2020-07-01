// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsUserComponent } from './user.component';

// 路由
import { RoutingModule } from './user.routing';

@NgModule({
    declarations: [
        OmsUserComponent
    ],

    imports: [
        RoutingModule
    ],

    entryComponents: [

    ]
})

export class OmsUserModule { }
