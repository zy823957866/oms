// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 模块
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';
import { OmsTableModule } from 'src/app/framework/core/component/table/oms-table.module';
import { OmsDownloadPageModule } from 'src/app/framework/core/component/download-page/download-page.module';
import { OmsCtrlColsModule } from 'src/app/framework/core/component/ctrl-cols/ctrl-cols.module';
import { OmsDialogTitleModule } from 'src/app/framework/core/component/dialog-title/dialog-title.module';

// 组件
import { OmsDictComponent } from './dict.component';
import { DictAddComponent } from './add/add.component';
import { DictItemsComponent } from './items/items.component';
import { DictItemsAddComponent } from './items/add/add.component';

// 路由
import { RoutingModule } from './dict.routing';


@NgModule({
    declarations: [ 
        OmsDictComponent,
        DictAddComponent,
        DictItemsComponent,
        DictItemsAddComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        OmsFormModule,
        OmsTableModule,
        OmsDownloadPageModule,
        OmsCtrlColsModule,
        OmsDialogTitleModule,
        RoutingModule
    ],
    entryComponents: [ 
        OmsDictComponent,
        DictAddComponent,
        DictItemsComponent,
        DictItemsAddComponent
    ]
})

export class OmsDictModule { }
