// 工具包
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';

// 组件
import { OmsTableComponent } from './oms-table.component';

// 管道
import { DictionaryPipeModule } from '../../pipes/dictionary/dictionary.module';
import { StructurePipeModule } from '../../pipes/structure/structure.module';
import { PermissionModule } from '../../directives/permission/permission.module';
import { PaginationModule } from '../pagination/pagination.module';



@NgModule({
    declarations: [
        OmsTableComponent
    ],
    imports: [
        MatCheckboxModule, 
        MatIconModule, 
        MatMenuModule, 
        MatButtonModule,
        MatTooltipModule,
        CommonModule,
        NgxDatatableModule,
        TranslateModule,
        DictionaryPipeModule,
        StructurePipeModule,
        PermissionModule,
        PaginationModule
    ],
    providers: [

    ],
    exports: [
        OmsTableComponent
    ]
})

export class OmsTableModule{}