// 工具包
import { Component, OnInit } from '@angular/core';

// 服务
import { FullCalendarService } from './full-calendar.servict';

@Component({
    selector: 'full-calendar',
    templateUrl: './full-calendar.component.html',
    styleUrls: ['./full-calendar.component.scss'],
    providers: [ FullCalendarService ]
})
export class FullCalendarComponent implements OnInit {

    constructor(
        public fullCalendar: FullCalendarService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.fullCalendar.init()
        });
    }

}
