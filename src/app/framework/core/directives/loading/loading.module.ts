/**
 * @desc 权限控制 directive
 * @auth zy
 * @date 2019.04.29
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingDirective } from "./loading.directive";

@NgModule({
    declarations: [ LoadingDirective ],
    imports: [ CommonModule ],
    exports: [ LoadingDirective ]
})

export class LoadingModule {}