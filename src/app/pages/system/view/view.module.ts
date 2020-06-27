// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 组件
import { SystemViewComponent } from './view.component';

// 模块
import { OmsTableModule } from 'src/app/framework/core/component/table/oms-table.module';
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';

// 路由
import { RoutingModule } from './view.routing';
import { OmsSelectModule } from 'src/app/framework/core/component/form/select/select.module';

@NgModule({
    declarations: [ SystemViewComponent ],
    imports: [
        OmsTableModule,
        OmsFormModule,
        OmsSelectModule,
        MatButtonModule,
        MatIconModule,
        RoutingModule
    ]
})

export class SystemViewModule { }
