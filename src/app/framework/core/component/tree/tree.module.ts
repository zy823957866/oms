// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 组件
import { OmsTreeComponent } from './tree.component';

@NgModule({
    declarations: [ OmsTreeComponent ],
    exports: [ OmsTreeComponent ],
    imports: [
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        CommonModule
    ]
})

export class OmsTreeModule { }
