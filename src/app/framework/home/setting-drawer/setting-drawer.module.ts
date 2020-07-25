// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

// 组件
import { SettingDrawerComponent } from './setting-drawer.component';
import { GenerateStyleComponent } from './generate-style/generate-style.component';

// 模块
import { OmsActionsModule } from '../../core/component/form/actions/actions.module';
import { OmsDialogTitleModule } from '../../core/component/dialog-title/dialog-title.module';
import { OmsTextareaModule } from '../../core/component/form/textarea/textarea.module';


@NgModule({
    declarations: [
        SettingDrawerComponent,
        GenerateStyleComponent
    ],

    imports: [
        CommonModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        OmsActionsModule,
        OmsDialogTitleModule,
        OmsTextareaModule
    ],

    exports: [
        SettingDrawerComponent,
        GenerateStyleComponent
    ]
})

export class SettingDrawerModule { }
