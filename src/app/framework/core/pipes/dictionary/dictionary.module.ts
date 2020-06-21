/**
 * @DESC 字典管道 PIPE
 * @AUTH CREATE BY ZHOUYONG
 * @DATE 2019.04.18
 */
import { NgModule } from '@angular/core';
import { DictionaryPipe } from "./dictionary.pipe";


@NgModule({
    declarations: [ DictionaryPipe ],
    exports: [ DictionaryPipe ]
})


export class DictionaryPipeModule {}