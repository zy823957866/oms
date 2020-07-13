// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'

// 组件
import { SettingDrawerComponent } from './setting-drawer.component';

@NgModule({
    declarations: [
        SettingDrawerComponent
    ],

    imports: [
        DragDropModule,
        CommonModule,
        MatIconModule,
        MatSidenavModule
    ],

    exports: [
        SettingDrawerComponent
    ]
})

export class SettingDrawerModule { }
