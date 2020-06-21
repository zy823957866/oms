import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogDragDirective } from "./dialog-drag.directive";

@NgModule({
    declarations: [DialogDragDirective],
    imports: [ CommonModule ],
    exports: [DialogDragDirective]
})

export class OmsDialogDragModule {}