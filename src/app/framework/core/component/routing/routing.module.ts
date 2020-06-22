/**
 * @DESC 临时路由 MODULE
 * @AUTH CREATE BY ZHOUYONG
 * @DATE 2019.04.18
 */
//工具包
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//组件
import { OmsRoutingComponent } from './routing.component';


@NgModule({
  imports: [ RouterModule ],
  declarations: [ OmsRoutingComponent ]
})


export class RoutingOutletModule{}