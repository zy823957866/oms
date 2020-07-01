// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsInterfacesComponent } from './interfaces.component';

// 路由
import { RoutingModule } from './interfaces.routing';

@NgModule({
    declarations: [
        OmsInterfacesComponent
    ],

    imports: [
        RoutingModule
    ],

    entryComponents: [

    ]
})

export class OmsInterfacesModule { }
