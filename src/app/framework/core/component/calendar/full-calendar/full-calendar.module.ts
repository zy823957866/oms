// 工具包
import { NgModule } from '@angular/core';

// 组件
import { FullCalendarComponent } from './full-calendar.component';


@NgModule({
    declarations: [ FullCalendarComponent ],
    exports: [ FullCalendarComponent ]
})

export class FullCalendarModule {}
