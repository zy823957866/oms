// 工具包
import { NgModule } from '@angular/core';

// 组件
import { SingleCalendarComponent } from './single-calendar.component';


@NgModule({
    declarations: [ SingleCalendarComponent ],
    exports: [ SingleCalendarComponent ]
})

export class SingleCalendarModule {}