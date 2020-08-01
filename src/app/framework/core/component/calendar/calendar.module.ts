// 工具包
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// 组件
import { CalendarComponent } from './calendar.component';

// 模块
import { FullCalendarModule } from './full-calendar/full-calendar.module';
import { SingleCalendarModule } from './single-calendar/single-calendar.module';
import { OmsSelectModule } from '../form/select/select.module';


@NgModule({
    declarations: [ CalendarComponent ],
    exports: [ CalendarComponent ],
    imports: [
        CommonModule,
        FullCalendarModule,
        SingleCalendarModule,
        OmsSelectModule,
        MatButtonToggleModule
    ]
})

export class CalendarModule {}
