import { Component, OnInit } from '@angular/core';
import { SingleCalendarService } from './single-calendar.service';

@Component({
    selector: 'single-calendar',
    templateUrl: './single-calendar.component.html',
    styleUrls: ['./single-calendar.component.scss'],
    providers: [ SingleCalendarService ]
})
export class SingleCalendarComponent implements OnInit {

    constructor(
        public singleCalendar: SingleCalendarService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.singleCalendar.createView();
        });
    }

}
