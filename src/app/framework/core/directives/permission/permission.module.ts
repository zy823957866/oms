/**
 * @desc 权限控制 directive
 * @auth zy
 * @date 2019.04.29
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionDirective } from "./permission.directive";

@NgModule({
    declarations: [PermissionDirective],
    imports: [ CommonModule ],
    exports: [PermissionDirective],
    providers: [],
})

export class PermissionModule {}