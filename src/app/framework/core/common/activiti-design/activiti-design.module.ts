// 工具包
import { NgModule } from '@angular/core';

// 组件
import { ActivitiDesignComponent } from './activiti-design.component';

@NgModule({
    declarations: [
        ActivitiDesignComponent
    ],
    exports: [
        ActivitiDesignComponent
    ]
})

export class ActivitiDesignModule { }
