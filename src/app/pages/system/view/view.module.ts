// 工具包
import { NgModule } from '@angular/core';

// 组件
import { SystemViewComponent } from './view.component';

// 模块
import { OmsTableModule } from 'src/app/framework/core/component/table/oms-table.module';
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';

// 路由
import { RoutingModule } from './view.routing';

@NgModule({
    declarations: [ SystemViewComponent ],
    imports: [
        OmsTableModule,
        OmsFormModule,
        RoutingModule
    ]
})

export class SystemViewModule { }
