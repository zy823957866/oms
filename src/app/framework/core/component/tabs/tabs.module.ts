// 工具包
import { NgModule } from '@angular/core';

// 组件
import { TabsComponent } from './tabs.component';

@NgModule({
    declarations: [
        TabsComponent
    ],
    exports: [
        TabsComponent
    ]
})

export class OmsTabsModule { }
