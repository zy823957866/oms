import { Component } from '@angular/core';

@Component({
    selector: 'oms-calendar',
    styleUrls: ['./calendar.component.scss'],
    templateUrl: './calendar.component.html'
})

export class CalendarComponent {
    toggle      : string = 'month';
    searchData  : any = { year: 2020, month: 7 };
    years       : any = [];
    months      : any = [];


    ngOnInit(): void {
        this.years = this.getYears(-30, 30);
        this.months = this.getMonth();
    }


    getYears(start, end) {
        let cYear = new Date().getFullYear();
        let years = [];

        for(let i = cYear + start; i <= cYear + end; i++) {
            years.push({
                DIC_KEY: i,
                DIC_VALUE: i + '年'
            })
        }

        return years;
    }

    getMonth() {
        let months = [];

        for(let i=1; i<13; i++) {
            months.push({
                DIC_KEY: i,
                DIC_VALUE: i + '月'
            })
        }

        return months;
    }

    // 年月切换
    togglePeriod(e) {
        this.toggle = e.value;
    }

    vChange(e) {
        console.log(e)
    }

}