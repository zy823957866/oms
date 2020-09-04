// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsInterfacesComponent } from './interfaces.component';

// 模块
import { OmsTabsModule } from './../../../framework/core/component/tabs/tabs.module';

// 服务
import { IndexDbService } from 'src/app/framework/core/services/indexDb.service';

// 路由
import { RoutingModule } from './interfaces.routing';


@NgModule({
    declarations: [
        OmsInterfacesComponent
    ],

    imports: [
        OmsTabsModule,
        RoutingModule
    ],

    providers: [
        IndexDbService
    ],

    entryComponents: [

    ]
})

export class OmsInterfacesModule { }
