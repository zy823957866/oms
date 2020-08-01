import { Injectable } from '@angular/core';

declare let $;

const MONTH = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const MONTH_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

@Injectable()

export class FullCalendarService {
    id: string = 'full-calenar';

    init(id = this.id) {
        this.id = id;

        this.fullYearPicker({
            disabledDay : '',
            cellClick: function(dateStr, isDisabled) {
                console.log("单击日期:"+dateStr);
            }
        })
    }

    fullYearPicker(config, param = null) {
        config = $.extend({
			year : new Date().getFullYear(),
			disabledDay : '',
			value : []
        }, config);
        
        this.renderYear(config.year, $(`#full-calenar`), config.disabledDay, config.value);
    }

    // 渲染年
    renderYear(year, el, disabledDay, value) {
        el.find('td').unbind();

        let s = '', values = ',' + value.join(',') + ',';

        for (var i = 1; i <= 12; i++) {
            s += this.renderMonth(year, i, false, disabledDay, values);
            // s+="<div class='date_clear'></div>";

            el.find('div.picker')
				.html(s)
				.find('td')
				.dblclick(function() {
                    console.log("----")
                })
        }
    }

    // 渲染月
    renderMonth(year, month, clear, disabledDay, values){
        let d = new Date(year, month - 1, 1), s = "<div class='month-container'>"+'<table cellpadding="3" cellspacing="1" border="0"'
        + (clear ? ' class="right"' : '')
        + '>'
        + '<tr><th colspan="7" class="head"  index="'+month+'">'
        + '<span>' + MONTH[month-1] + ' ' + MONTH_EN[month-1] + '</span>'
        + '</th></tr>'
        + '<tr><th class="weekend">'+WEEK[0]+'</th><th>'+WEEK[1]+'</th><th>'+WEEK[2]+'</th><th>'+WEEK[3]+'</th><th>'+WEEK[4]+'</th><th>'+WEEK[5]+'</th><th class="weekend">'+WEEK[6]+'</th></tr>';

        let dMonth = month - 1;
		let firstDay = d.getDay(), hit = false;
		s += '<tr>';
		for (var i = 0; i < 7; i++)
			if (firstDay == i || hit) {
				s += '<td'
						+ this.tdClass(i, disabledDay, true, values, year
								+ '-' + month + '-' + d.getDate())
						+ '>' + d.getDate() + '</td>';
				d.setDate(d.getDate() + 1);
				hit = true;
			} else
				s += '<td' + this.tdClass(i, disabledDay, false)
						+ '>&nbsp;</td>';
		s += '</tr>';
		for (var i = 0; i < 5; i++) {
			s += '<tr>';
			for (var j = 0; j < 7; j++) {
				s += '<td'
						+ this.tdClass(j, disabledDay,
								d.getMonth() == dMonth, values, year
										+ '-' + month + '-'
										+ d.getDate())
						+ '>'
						+ (d.getMonth() == dMonth ? d.getDate()
								: '&nbsp;') + '</td>';
				d.setDate(d.getDate() + 1);
			}
			s += '</tr>';
		}
		return s + '</table></div>' + (clear ? '<br>' : '');
    }

    addClass(classname = '') {
        $('#full-calenar').addClass(classname);
    }

    tdClass(i, disabledDay, sameMonth, values=null, dateStr=null) {
		
		let cls = i == 0 || i == 6 ? 'weekend' : '';
		if (disabledDay && disabledDay.indexOf(i) != -1)
			cls += (cls ? ' ' : '') + 'disabled';
		if (!sameMonth){
			cls += (cls ? ' ' : '') + 'empty';
		}else{
			cls += (cls ? ' ' : '') + 'able_day';
		}
		if (sameMonth && values && cls.indexOf('disabled') == -1
				&& values.indexOf(',' + dateStr + ',') != -1)
			cls += (cls ? ' ' : '') + 'selected';
		return cls == '' ? '' : ' class="' + cls + '"';
    }
    

    // 设置
	setDay(start,end,new_class){
		var max=60;//当天数要选择到最后一天取一个大于所以月份的值

		//清除选中单元格的样式
		$(".month-container .selected").removeClass("selected");
		var start_month=parseInt(start.split("-")[0]);
		var start_day=parseInt(start.split("-")[1]);
		var end_month=parseInt(end.split("-")[0]);
		var end_day=parseInt(end.split("-")[1]);
		if(start_month==end_month){
			if(start_day<end_day){
				this.select_month(start_month, start_day, end_day,new_class);
			}else{
				this.select_month(start_month, end_day, start_day,new_class);
			}
		}else if(start_month<end_month){
			this.select_month(start_month, start_day, max,new_class);
			for(var i=start_month+1;i<end_month;i++){
				this.select_month(i, 1, max,new_class);
			}
			this.select_month(end_month, 1, end_day,new_class);
		}else if(start_month>end_month){
			this.select_month(start_month, 1, start_day,new_class);
			for(var i=end_month+1;i<start_month;i++){
				this.select_month(i, 1, max,new_class);
			}
			this.select_month(end_month, end_day, max,new_class);
		}
		
	}
	/*按月加载样式*/
	select_month(month,start,end,new_class){
		month=month-1;
		$(".fullYearPicker .picker .month-container:eq("+month+") td").each(function(){
			var num=$(this).text();
			if(num>=start&&num<=end){
				$(this).addClass(new_class);
			}
		});
		
	}
}