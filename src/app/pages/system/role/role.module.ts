// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 组件
import { OmsRoleComponent } from './role.component';
import { RoleAddComponent } from './add/add.component';
import { RoleSettingComponent } from './setting/setting.component';

// 模块
import { OmsTableModule } from 'src/app/framework/core/component/table/oms-table.module';
import { OmsFormModule } from 'src/app/framework/core/component/form/form.module';
import { OmsDownloadPageModule } from 'src/app/framework/core/component/download-page/download-page.module';
import { OmsCtrlColsModule } from 'src/app/framework/core/component/ctrl-cols/ctrl-cols.module';
import { OmsDialogTitleModule } from 'src/app/framework/core/component/dialog-title/dialog-title.module';
import { OmsTreeModule } from 'src/app/framework/core/component/tree/tree.module';

// 路由
import { RoutingModule } from './role.routing';
import { OverlayComponent } from './overlay/overlay.component';
import { overlayService } from 'src/app/framework/core/services/overlay.service';
import { OverlayModule, OverlayContainer, FullscreenOverlayContainer } from "@angular/cdk/overlay";


@NgModule({
    declarations: [
        OmsRoleComponent,
        RoleAddComponent,
        RoleSettingComponent,
        OverlayComponent
    ],

    imports: [
        MatButtonModule,
        MatIconModule,
        OmsTableModule,
        OmsFormModule,
        OmsDownloadPageModule,
        OmsCtrlColsModule,
        OmsDialogTitleModule,
        OmsTreeModule,
        OverlayModule,
        // OverlayContainer, 
        // FullscreenOverlayContainer,
        RoutingModule
    ],

    providers: [
        overlayService
    ],

    entryComponents: [
        RoleAddComponent,
        RoleSettingComponent,
        OverlayComponent
    ]
})

export class OmsRoleModule { }
