import { NgModule } from '@angular/core';

import { ValidStyleDirective } from "./valid-style.directive";

@NgModule({
    declarations: [ ValidStyleDirective ],
    exports: [ ValidStyleDirective]
})

export class ValidStyleModule {}