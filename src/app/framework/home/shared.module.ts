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
import { MomentService } from '../core/services/moment.service';
import { InitDictionaryService } from '../core/services/init-dictionary.service';
import { OmsDownloadPageService } from '../core/services/download-page.service';
import { OmsPageCodeService } from '../core/services/page-code.service';

// 模块
import { OmsDownloadColumnModule } from '../core/component/download-column/download-column.module';




// 服务汇总
const SERVICE = [
    DictionaryService,
    StructureService,
    ExcelService,
    MomentService,
    InitDictionaryService,
    OmsDownloadPageService,
    OmsPageCodeService
];

@NgModule({
    providers: [...SERVICE],
    imports: [
        OmsDownloadColumnModule
    ]
})

export class OmsSharedModule {
    static forRoot(): ModuleWithProviders{
        return <ModuleWithProviders>{
            ngModule: OmsSharedModule,
            providers: []
        };
    }
}