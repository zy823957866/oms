/**
 * @DESC 字典管道 PIPE
 * @AUTH CREATE BY ZHOUYONG
 * @DATE 2019.04.18
 */
import { NgModule } from '@angular/core';
import { StructurePipe } from "./structure.pipe";


@NgModule({
    declarations: [ StructurePipe ],
    exports: [ StructurePipe ]
})


export class StructurePipeModule {}