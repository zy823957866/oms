// 工具包
import { NgModule } from '@angular/core';

// 组件
import { DashboardComponent } from './dashboard.component';

// 模块
import { OmsTableModule } from 'src/app/framework/core/component/table/oms-table.module';
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';

// 路由
import { RoutingModule } from './dashboard.routing';
import { OmsConfirmModule } from 'src/app/framework/core/component/confim/confirm.module';


@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        OmsTableModule,
        OmsFormModule,
        OmsConfirmModule,
        RoutingModule
    ],
    providers: [ ]
})

export class DashboardModule { }
