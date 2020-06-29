// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 组件
import { SystemViewComponent } from './view.component';

// 模块
import { OmsTableModule } from 'src/app/framework/core/component/table/oms-table.module';
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';
import { OmsDownloadPageModule } from 'src/app/framework/core/component/download-page/download-page.module';
import { OmsSelectModule } from 'src/app/framework/core/component/form/select/select.module';
import { OmsCtrlColsModule } from 'src/app/framework/core/component/ctrl-cols/ctrl-cols.module';

// 路由
import { RoutingModule } from './view.routing';


@NgModule({
    declarations: [ SystemViewComponent ],
    imports: [
        OmsTableModule,
        OmsFormModule,
        OmsSelectModule,
        MatButtonModule,
        MatIconModule,
        OmsDownloadPageModule,
        OmsCtrlColsModule,
        RoutingModule
    ]
})

export class SystemViewModule { }
