// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


// 组件
import { HeaderComponent } from './header.component';
import { OmsUserInfoComponent } from './user-info/user-info.component';
import { OmsNotificationComponent } from './notification/notification.component';
import { OmsUserToolbarComponent } from './user-toolbar/user-toolbar.component';

// 服务
import { StorageService } from '../../core/services/storage.service';
import { HttpApiService } from '../../core/services/http.service';

// 模块
import { OmsAlertModule } from '../../core/component/alert/alert.module';


@NgModule({
    declarations: [
        HeaderComponent,
        OmsUserInfoComponent,
        OmsNotificationComponent,
        OmsUserToolbarComponent
    ],

    exports: [
        HeaderComponent,
        OmsUserInfoComponent,
        OmsNotificationComponent,
        OmsUserToolbarComponent
    ],

    imports: [
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        CommonModule,
        PerfectScrollbarModule,
        OmsAlertModule
    ],

    providers: [
        StorageService,
        HttpApiService
    ]
})

export class OmsHeaderModule { }
