/*
 * @Author: zhouyong
 * @Date: 2020-06-13 11:00:24
 * @Description: Modify here please
 */
// 工具包
import { NgModule } from '@angular/core';

// 组件
import { NotFindComponent } from './not-find.component';

// 模块
import { RoutingModule } from './not-find.routing';

@NgModule({
    declarations: [
        NotFindComponent
    ],
    imports: [
        RoutingModule
    ]
})

export class NotFindModule{ }
