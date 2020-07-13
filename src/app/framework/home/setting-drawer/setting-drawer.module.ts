// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

// 组件
import { SettingDrawerComponent } from './setting-drawer.component';

@NgModule({
    declarations: [
        SettingDrawerComponent
    ],

    imports: [
        CommonModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule
    ],

    exports: [
        SettingDrawerComponent
    ]
})

export class SettingDrawerModule { }
