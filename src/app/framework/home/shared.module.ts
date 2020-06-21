/**
 * 此模块中定义了继承basepage必须用到的的服务
 */
// 工具包
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';

// 服务
import { DictionaryService } from '../core/services/dictionary.service';
import { StructureService } from '../core/services/structure.service';
import { ExcelService } from '../core/services/excel.service';
import { DownLoadService } from '../core/services/download.service';
import { MomentService } from '../core/services/moment.service';
import { InitDictionaryService } from '../core/services/init-dictionary.service';


// 服务汇总
const SERVICE = [
    DictionaryService,
    StructureService,
    ExcelService,
    DownLoadService,
    MomentService,
    InitDictionaryService,
];

@NgModule({
    providers: [...SERVICE]
})

export class OmsSharedModule {
    static forRoot(): ModuleWithProviders{
        return <ModuleWithProviders>{
            ngModule: OmsSharedModule,
            providers: []
        };
    }
}