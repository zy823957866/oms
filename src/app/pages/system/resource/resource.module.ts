// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsResourceComponent } from './resource.component';

// 模块
import { CalendarModule } from 'src/app/framework/core/component/calendar/calendar.module';

// 路由
import { RoutingModule } from './resource.routing';


@NgModule({
    declarations: [
        OmsResourceComponent
    ],

    imports: [
        CalendarModule,
        RoutingModule
    ],

    entryComponents: [

    ]
})

export class OmsResourceModule { }
