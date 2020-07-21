// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

// 组件
import { SettingDrawerComponent } from './setting-drawer.component';

// 模块
import { OmsActionsModule } from '../../core/component/form/actions/actions.module';

@NgModule({
    declarations: [
        SettingDrawerComponent
    ],

    imports: [
        CommonModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        FormsModule,
        OmsActionsModule
    ],

    exports: [
        SettingDrawerComponent
    ]
})

export class SettingDrawerModule { }
