// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsResourceComponent } from './resource.component';

// 路由
import { RoutingModule } from './resource.routing';

@NgModule({
    declarations: [
        OmsResourceComponent
    ],

    imports: [
        RoutingModule
    ],

    entryComponents: [

    ]
})

export class OmsResourceModule { }
