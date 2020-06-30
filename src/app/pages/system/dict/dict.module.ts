// 工具包
import { NgModule } from '@angular/core';

// 组件
import { OmsDictComponent } from './dict.component';

// 路由
import { RoutingModule } from './dict.routing';

@NgModule({
    declarations: [ 
        OmsDictComponent 
    ],
    imports: [
        RoutingModule
    ],
    entryComponents: [ 
        OmsDictComponent 
    ]
})

export class OmsDictModule { }
