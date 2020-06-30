// 工具包
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// 组件
import { OmsCtrlColsComponent } from './ctrl-cols.component';
import { OmsAvailableColsComponent } from './available-cols/available-cols.component';
import { OmsAvailableColsAddComponent } from './available-cols/add/add.component';

// 模块
import { OmsDialogTitleModule } from '../dialog-title/dialog-title.module';
import { OmsFormModule } from '../form/form.module';
import { OmsTableModule } from '../table/oms-table.module';


@NgModule({
    declarations: [
        OmsCtrlColsComponent, 
        OmsAvailableColsComponent,
        OmsAvailableColsAddComponent
    ],
    exports: [ OmsCtrlColsComponent ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatSlideToggleModule,
        OmsDialogTitleModule,
        OmsFormModule,
        OmsTableModule
    ],

    entryComponents: [
        OmsAvailableColsComponent,
        OmsAvailableColsAddComponent
    ]
})

export class OmsCtrlColsModule { }
