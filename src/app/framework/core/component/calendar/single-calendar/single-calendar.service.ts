import { Injectable } from '@angular/core';

declare let $;

const data = [{
	'name': "145",
	'startDate': "2020-3-09 15:31:29",
	'type': "手机号"
}, {
	'name': "178956874",
	'startDate': "2020-3-23 15:31:29",
	'type': "手机号"
}, {
	'name': "信息编辑",
	'startDate': "2020-3-20 15:31:29",
	'type': "手机号"
}];
const workdata=[
    "2020-4-26",
    "2020-5-9",
    "2020-6-28",
    "2020-9-27",
    "2020-10-10"
]
const holidaydata = [{
	"holiday_name":"春节",
	"holiday_time":[
		"2020-1-24",
		"2020-1-25",
		"2020-1-26",
		"2020-1-27",
		"2020-1-28",
		"2020-1-29",
		"2020-1-30",
		"2020-1-31",
		"2020-2-1",
		"2020-2-2"
		]},{
	"holiday_name":"清明节",
	"holiday_time":[
		"2020-4-4",
		"2020-4-5",
		"2020-4-6"
		]},{
	"holiday_name":"劳动节",
	"holiday_time":[
		"2020-5-1",
		"2020-5-2",
		"2020-5-3",
		"2020-5-4",
		"2020-5-5"
	]},{
	"holiday_name":"端午节",
	"holiday_time":[
		"2020-6-25",
		"2020-6-26",
		"2020-6-27"
	]},{
	"holiday_name":"国庆节、中秋节",
	"holiday_time":[
		"2020-10-1",
		"2020-10-2",
		"2020-10-3",
		"2020-10-4",
		"2020-10-5",
		"2020-10-6",
		"2020-10-7",
		"2020-10-8"
	]}];

const OPTIONS = {
    mode: 'month',
    weekMode: ["一", "二", "三", "四", "五", "六", "日"],
    addholiday:true,//是否自定义节假日时间
    holiday:holidaydata,//放假安排
    work:workdata,//上班时间
    datecoding:[19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42448, 83315, 21200, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46496, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448],  
    signyear : "甲乙丙丁戊己庚辛壬癸",  
    signyears : "子丑寅卯辰巳午未申酉戌亥",  
    sign :"鼠牛虎兔龙蛇马羊猴鸡狗猪",  
    terms: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],  
    datenate: [0, 21208, 43467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758],  
    period:"日一二三四五六七八九十",
    lunar:["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"],  
    lunarperiod:"初十廿卅",  
    festival:{  
        "0101": "*1元旦节",  
        "0214": "情人节",  
        "0305": "学雷锋纪念日",  
        "0308": "妇女节",  
        "0312": "植树节",  
        "0315": "消费者权益日",  
        "0401": "愚人节",  
        "0501": "*1劳动节",  
        "0504": "青年节",  
        "0601": "国际儿童节",  
        "0701": "中国共产党诞辰",  
        "0801": "建军节",  
        "0910": "中国教师节",  
        "1001": "*3国庆节",  
        "1224": "平安夜",  
        "1225": "圣诞节"  
    },  
    festivals:{  
        "0101": "*2春节",  
        "0115": "元宵节",  
        "0505": "*1端午节",  
        "0815": "*1中秋节",  
        "0909": "重阳节",  
        "1208": "腊八节",  
        "0100": "除夕"  
    },  
    newDate: new Date(),
    width: null,
    shwoLunar: true,
    showModeBtn: true,
    showEvent: true,
    maxEvent: null
}

@Injectable()

export class SingleCalendarService {
    elId    : string = 'single-calendar';
    el      : any;
    options : any = Object.assign({}, OPTIONS);
    viewData: any = null;

    constructor() {

    }

    createView(id = this.elId) {
        this.el = $(`${id}`);

        let { mode, newDate, width } = OPTIONS;
        let html = '';

        html += '<div class="calendar-body">';
        html += '<table class="calendar-table" cellspacing="0">';
        if (mode == "month") {
            html += this.createHeader();
        }
        html += this.createBody();
        html += '</table>'
        html += '</div>'
        console.log(this.el)
        this.el.html(html); 

        if (mode == "month") {
            this.refreshCalendar(newDate, null);
        }
    }

    createHeader() {
        var me = this,
        opts = me.options,
        weekMode = opts.weekMode;
        var s = '<thead><tr>'
        weekMode.forEach(function (item) {
            s += ' <th class="calendar-column-header" title="周' + item + '"><span class="calendar-column-header-inner">' + item + '</span></th>'
        })
        s += '</thead></tr>'
        return s;
    }

    createBody() {
        var me = this;
        var s = ' <tbody class="calendar-tbody">'
        s += '</tbody>'
        return s;
    }

    refreshCalendar(newDate,cycleData) {
        let showEvent = this.options.showEvent,
            maxEvent = this.options.maxEvent,
            holiday= this.options.holiday,
            h= this.options.height,
            el = this.el,
            s = '',
            X={
                dateArray: null
            };

        this.viewData = cycleData != null ? this.getViewDate(newDate,cycleData) : this.getViewDate(newDate,null);

        let _newDate = this.cloneDate(newDate);
        // 当前date
        let nowNum = _newDate.getDate(),
            week=[6,0];
        
        // 第一天周几
        _newDate.setDate(1);

        let weekDay = _newDate.getDay() == 0 ? 7 : _newDate.getDay();
        // 视图第一天
        let viewDate = this.cloneDate(_newDate);
        viewDate.setDate(viewDate.getDate() - weekDay + 1);

        // 当前第几周/行
        let renderDate = this.cloneDate(viewDate);
        let A = this.calendardata(renderDate,weekDay);
        this.structure(A,X);

        let ins= X.dateArray;

        //固定六行
        for (var i = 0; i < 6; i++) {
            s += '<tr>'
            for (var l = 0; l < 7; l++) {
                var year = renderDate.getFullYear();
                var month = renderDate.getMonth() + 1;
                var date = renderDate.getDate();
                var day = renderDate.getDay();
                if (renderDate.getMonth() < newDate.getMonth()) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-last-month-cell">';
                }
                else if (renderDate.getMonth() > newDate.getMonth()) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-next-month-cell">';
                }
                else if (date == nowNum) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-today">';
                }else if(day==week[0] || day==week[1]){
                	   s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-weekend">';
                }
                else {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell">';
                }
		        s += '<div class="calendar-date">';
                s += '<div class="calendar-value">' + date + '</div>';
                for (var a = 0; a < ins.length; a++) { 
	                if(ins[a]!=null){
		                if(ins[a].solarMonth==month){
		                	if(ins[a].solarDate==date){
		                		s += '<div class="value">' + ins[a].showInLunar + '</div>';
		                		if(ins[a].holidayDate=="holiday"){
		                			s += '<div class="calendar-holiday">休</div><span class="calendar-holiday-bg"></span>';
		                		}else if(ins[a].holidayDate=="work"){
		                			
		                			s += '<div class="calendar-work">班</div><span class="calendar-work-bg"></span>';
		                		}
		                	}
		                }
	                }
                }
                s += '<div class="calendar-content"><ul class="events">'
                if (showEvent && this.viewData[date] && renderDate.getMonth() == newDate.getMonth()) {
                    if (maxEvent && this.viewData[date].length > maxEvent) {
                        s += this.viewData[date].length + "个事件";
                    }
                    else {
                        this.viewData[date].forEach(function (item) {
                            s += '<li><span>' + item.name + '</span></li>'
                        })
                    }
                }
                s += '</ul ></div > ';
                s += '</div></td>';
                renderDate.setDate(renderDate.getDate() + 1);
            }
            s += '</tr>'
        }
        
        this.el.find(".calendar-tbody").html(s);
        
    }

    getViewDate(viewDate,cycleData) {
        let opts = this.options,
            mode = opts.mode;
        
        let data = cycleData!=null ? cycleData : opts.data;

        if (!data || data.length == 0) return [];

        let viewData = {},
            modeYear = viewDate.getFullYear(),
            modeMonth = null;

        if (mode == "month") { modeMonth = viewDate.getMonth() };

        //筛选视图数据并转化未对象 要不要转化为属性
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let start = this.getDateByString(item.startDate);

            let year = start.getFullYear(),
                month = start.getMonth(),
                date = start.getDate();

            if (modeMonth && year == modeYear && modeMonth == month) {
                if (!viewData[date]) viewData[date] = [];
                viewData[date].push(item);
            }
            else if (!modeMonth && year == modeYear) {
                if (!viewData[month]) viewData[month] = [];
                viewData[month].push(item);
            }
        }

        return viewData;
    }

    getDateByString(stringDate) {
        let timearr = stringDate.replace(" ", ":").replace(/\:/g, "-").split("-"),
            timestr = ""+timearr[0]+"-" + timearr[1] + "-" + timearr[2],
            year = timestr.split("-")[0],
            month = parseInt(stringDate.split("-")[1]) - 1,
            date = timestr.split("-")[2];

        return new Date(Number(year), month, Number(date));
    }

    cloneDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    calendardata(Y,weekDay=null) {
		let me=this,
		    holiday= me.options.holiday,
		    work=me.options.work,
		    P=me.options.datecoding,  
            K=me.options.signyear,
		    J=me.options.signyears,  
		    O=me.options.sign,  
		    L=me.options.terms,  
		    D=me.options.datenate,  
		    B=me.options.period,  
		    H=me.options.lunar,  
		    E=me.options.lunarperiod,  
		    V=me.options.festival,  
	        T=me.options.festivals;
        let c=function(j, i) {  
            let h = new Date((31556925974.7 * (j - 1900) + D[i] * 60000) + Date.UTC(1900, 0, 6, 2, 5));  
            return (h.getUTCDate())  
        }  
        let d=function(k) {  
            let h, j = 348;  
            for (h = 32768; h > 8; h >>= 1) {  
                j += (P[k - 1900] & h) ? 1 : 0  
            }  
            return (j + b(k))  
        }  
        let a=function(h) {  
            return (K.charAt(h % 10) + J.charAt(h % 12))  
        }  
        let b=function(h) {  
            if (g(h)) {  
                return ((P[h - 1900] & 65536) ? 30 : 29)  
            } else {  
                return (0)  
            }  
        }  
		let g=function(h) {  
                return (P[h - 1900] & 15)  
            }  
            let e=function(i, h) {  
                return ((P[i - 1900] & (65536 >> h)) ? 30 : 29)  
            }  
        let C=function(m){  
            let k, j = 0, arr={
                dayCyl: null,
                monCyl: null,
                year: null,
                yearCyl: null,
                isLeap: null,
                month: null,
                day: null
            }, 
            h = 0;  
            var l = new Date(1900, 0, 31).getTime();  
            var n = (m - l) / 86400000;  
            arr.dayCyl = n + 40;  
            arr.monCyl = 14;  
            for (k = 1900; k < 2050 && n > 0; k++) {  
                h = d(k);  
                n -= h;  
                arr.monCyl += 12  
            }  
            if (n < 0) {  
                n += h;  
                k--;  
                arr.monCyl -= 12  
            }  
            arr.year = k;  
            arr.yearCyl = k - 1864;  
            j = g(k);  
            arr.isLeap = false;  
            for (k = 1; k < 13 && n > 0; k++) {  
                if (j > 0 && k == (j + 1) && arr.isLeap == false) {--k;  
                    arr.isLeap = true;  
                    h = b(arr.year)  
                } else {  
                    h = e(arr.year, k)  
                }  
                if (arr.isLeap == true && k == (j + 1)) {  
                    arr.isLeap = false  
                }  
                n -= h;  
                if (arr.isLeap == false) {  
                    arr.monCyl++  
                }  
            }  
            if (n == 0 && j > 0 && k == j + 1) {  
                if (arr.isLeap) {  
                    arr.isLeap = false  
                } else {  
                    arr.isLeap = true; --k; --arr.monCyl  
                }  
            }  
            if (n < 0) {  
                n += h; --k; --arr.monCyl  
            }  
            arr.month = k;  
            arr.day = n + 1;
            return arr;
        
        }
        var G=function(h) {  
            return h < 10 ? "0" + h: h  
        }  
        var f=function(i, j) {  
            var h = i;  
            return j.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g,  
            function(k) {  
                switch (k) {  
                case "yyyy":  
                    var l = "000" + h.getFullYear();  
                    return l.substring(l.length - 4);  
                case "dd":  
                    return G(h.getDate());  
                case "d":  
                    return h.getDate().toString();  
                case "MM": 
                    if(weekDay==1){
                        return G((h.getMonth()));  
                    }else{
                        return G((h.getMonth() + 1));  
                    }
                case "M":  
                    if(weekDay==1){
                        return G((h.getMonth()));  
                    }else{
                        return G((h.getMonth() + 1));  
                    } 
                }  
            })  
        }  
        var Z=function(i, h) {  
            var j;  
            switch (h) {  
            case 10:  
                j = "初十";  
                break;  
            case 20:  
                j = "二十";  
                break;  
            case 30:  
                j = "三十";  
                break;  
            default:  
                j = E.charAt(Math.floor(h / 10));  
                j += B.charAt(h % 10)  
            }  
            return (j)  
        }

        let X =C(Y);  
        let newarr={
            date: Y,
            isToday: false,
            isRestDay: false,
            solarYear: f(Y, "yyyy"),
            solarMonth: f(Y, "M"),
            solarDate: f(Y, "d"),
            solarWeekDay: Y.getDay(),
            solarWeekDayInChinese: "星期" + B.charAt(Y.getDay()),
            lunarYear: X.year,
            shengxiao: O.charAt((X.year - 4) % 12),
            lunarMonth: X.month,
            lunarIsLeapMonth: X.isLeap,
            lunarMonthInChinese: X.isLeap ? "闰" + H[X.month - 1] : H[X.month - 1],
            lunarDate: X.day,
            showInLunar: Z(X.month, X.day),
            lunarDateInChinese: Z(X.month, X.day),
            ganzhiYear: a(X.yearCyl),
            ganzhiMonth: a(X.monCyl),
            ganzhiDate: a(X.dayCyl++),
            holidayDate: '',
            jieqi: '',
            restDays: 0,
            solarFestival: V[f(Y, "MM") + f(Y, "dd")],
            lunarFestival: T[X.isLeap ? "00": G(X.month) + G(X.day)]
        };

        if (newarr.lunarDate == 1) {  
            newarr.showInLunar = newarr.lunarMonthInChinese + "月"  
        }  
        if (c(newarr.solarYear, (newarr.solarMonth - 1) * 2) == f(Y, "d")) {  
            newarr.showInLunar = newarr.jieqi = L[(newarr.solarMonth - 1) * 2]  
        }  
        if (c(newarr.solarYear, (newarr.solarMonth - 1) * 2 + 1) == f(Y, "d")) {  
            newarr.showInLunar = newarr.jieqi = L[(newarr.solarMonth - 1) * 2 + 1]  
        }  
        if (newarr.showInLunar == "清明") {  
            newarr.showInLunar = "清明节";  
            newarr.restDays = 1  
        }  
        if (typeof newarr.solarFestival == "undefined") {  
            newarr.solarFestival = ""  
        } else {  
            if (/\*(\d)/.test(newarr.solarFestival)) {  
                newarr.restDays = parseInt(RegExp.$1);  
                newarr.solarFestival = newarr.solarFestival.replace(/\*\d/, "")  
            }  
        } 
        
        newarr.lunarFestival = T[newarr.lunarIsLeapMonth ? "00": G(newarr.lunarMonth) + G(newarr.lunarDate)];  
        if (typeof newarr.lunarFestival == "undefined") {  
            newarr.lunarFestival = ""  
        } else {  
            if (/\*(\d)/.test(newarr.lunarFestival)) {  
                newarr.restDays = (newarr.restDays > parseInt(RegExp.$1)) ? newarr.restDays: parseInt(RegExp.$1);  
                newarr.lunarFestival = newarr.lunarFestival.replace(/\*\d/, "")  
            }  
        }  
        if (newarr.lunarMonth == 12 && newarr.lunarDate == e(newarr.lunarYear, 12)) {  
            newarr.lunarFestival = T["0100"];  
            newarr.restDays = 1  
        }  
        newarr.showInLunar = (newarr.lunarFestival == "") ? newarr.showInLunar: newarr.lunarFestival;  
        newarr.showInLunar = (newarr.showInLunar.length > 4) ? newarr.showInLunar.substr(0, 2) + "...": newarr.showInLunar ;
        if(holiday!=null){
            // holiday.myMap(function(eve,i){
            //     var name=eve.holiday_name;
            //     var lt=eve.holiday_time;
            //     for(var t=0;t<lt.length;t++){
            //         var startDate = this.getDateByString(lt[t]); // 日期变换
            //         var year = startDate.getFullYear();
            //         var month = startDate.getMonth()+1;
            //         var day = startDate.getDate();
            //         if(newarr.solarYear==year){
            //             if(newarr.solarMonth==month){
            //                 if(newarr.solarDate ==day ){
            //                     newarr.holidayDate="holiday";
            //                 }
            //             }
            //         }
            //     }
            // });
        }
        
        for(var w=0;w<work.length;w++){
                var startDate = this.getDateByString(work[w]); // 日期变换
                var year = startDate.getFullYear();
                var month = startDate.getMonth()+1;
                var day = startDate.getDate();
                if(newarr.solarYear==year){
                    if(newarr.solarMonth==month){
                        if(newarr.solarDate ==day ){
                            newarr.holidayDate="work";
                        }
                    }
                }
        }
        return newarr;
    }
    
    structure(date,X) {
        let me=this;
            X.lines = 0;  
            X.dateArray = new Array(42);  
        let Y=function(a) {  
            return (((a % 4 === 0) && (a % 100 !== 0)) || (a % 400 === 0))  
        }  
        let G=function(a, b) {  
            return [31, (Y(a) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]  
        }  
        let C=function(a, b) {  
            a.setDate(a.getDate() + b);  
            return a  
        }  
        let self = this;
        let Z=function(a) {  
            var f = 0;
            var c = self.calendardata(new Date(a.solarYear, a.solarMonth, 1)); 
            var d = (c.solarWeekDay - 1 == -1) ? 6 : c.solarWeekDay-1;  
            X.lines = Math.ceil((d + G(a.solarYear, a.solarMonth)) / 7);  
            for (var e = 0; e < X.dateArray.length; e++) {  
                if (c.restDays != 0) {  
                    f = c.restDays;
                }  

                if (f > 0) {  
                    c['isRest'] = true;
                }  
                if (d-->0) {
                    var days=parseInt(a.solarDate)+d;
                    var o = self.calendardata(new Date(a.solarYear, a.solarMonth-1,days)); 
                    X.dateArray[e] =o;    
                }else{  
                    var b = self.calendardata(new Date());  
                    if (c.solarYear == b.solarYear && c.solarMonth == b.solarMonth && c.solarDate == b.solarDate) {  
                        c.isToday = true  
                    }  
                    X.dateArray[e] = c;  
                    c = self.calendardata(C(c.date, 1));  
                    f--  
                }
            }  
        }  
        Z(date);  
    }

    // myMap(fn, context) {
    //     context = context || window;
	// 	var ary = [];
	// 	if(Array.prototype.map) {
	// 		ary = this.map(fn, context);
	// 	} else {
	// 		for(var i = 0; i < this.length; i++) {
	// 			ary[i] = fn.apply(context, [this[i], i, this]);
	// 		}
	// 	}
	// 	return ary;
    // }
}