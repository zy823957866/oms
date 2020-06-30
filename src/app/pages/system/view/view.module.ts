// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// 组件
import { SystemViewComponent } from './view.component';
import { ViewAddComponent } from './add/add.component';
import { OmsViewColumnComponent } from './column/column.component';
import { ColumnAddComponent } from './column/add/add.component';

// 模块
import { OmsTableModule } from 'src/app/framework/core/component/table/oms-table.module';
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';
import { OmsDownloadPageModule } from 'src/app/framework/core/component/download-page/download-page.module';
import { OmsSelectModule } from 'src/app/framework/core/component/form/select/select.module';
import { OmsCtrlColsModule } from 'src/app/framework/core/component/ctrl-cols/ctrl-cols.module';
import { OmsDialogTitleModule } from 'src/app/framework/core/component/dialog-title/dialog-title.module';

// 路由
import { RoutingModule } from './view.routing';


@NgModule({
    declarations: [ 
        SystemViewComponent,
        ViewAddComponent,
        OmsViewColumnComponent,
        ColumnAddComponent
    ],
    imports: [
        OmsTableModule,
        OmsFormModule,
        OmsSelectModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        OmsDownloadPageModule,
        OmsCtrlColsModule,
        OmsDialogTitleModule,
        CommonModule,
        RoutingModule
    ],
    entryComponents: [
        ViewAddComponent,
        OmsViewColumnComponent,
        ColumnAddComponent
    ]
})

export class SystemViewModule { }
