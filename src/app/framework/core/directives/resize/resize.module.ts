import { NgModule } from '@angular/core';

import { ElResizeDirective } from "./resize.directive";

@NgModule({
    declarations: [ElResizeDirective],
    exports: [ElResizeDirective]
})

export class ElResizeModule {}