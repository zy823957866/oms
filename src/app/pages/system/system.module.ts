// 原始包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 模块
import { RoutingOutletModule } from '../../framework/core/component/routing/routing.module';
import { RoutingModule } from './system.routing';

@NgModule({
	imports: [
		RoutingOutletModule,
		CommonModule,
		RoutingModule
	]
})

export class SystemModule { }