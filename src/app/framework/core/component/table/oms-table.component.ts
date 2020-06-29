import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';


@Component({
    selector: 'oms-table',
    styleUrls: ['./oms-table.component.scss'],
    templateUrl:'./oms-table.component.html'
})

export class OmsTableComponent {
    @ContentChild(TemplateRef) template: any;
    @ViewChild('dataTable') dataTable: any;

  
	//单选或者多选
	@Input() selectionType: string = 'checkbox';
	//是否显示进度条
	@Input() loadingIndicator: boolean = false;
	//设置table cell宽度的模式
	@Input() columnMode: string = 'force';
	@Input() scrollbarH: boolean = false;
	//顶部高度
	@Input() headerHeight: number = 30;
	//底部高度
	@Input() footerHeight: number = 40;
	//行高
	@Input() rowHeight: number = 30;
	//排序,默认支持多个排序
	@Input() sortType: string = 'multi';
	//是否支持重新排序
	@Input() reorderable: boolean = true;
	//使用外部分页而不是客户端分页
	@Input() externalPaging: boolean = true;
	//通过页面传输控制是否显示checkbox
	@Input() showCheckbox: boolean=false;
	//用户自定义内容
	@Input() userDefine: Array<TemplateRef<any>>;
	//操作栏用户自定义
	@Input() actionUserDefine: TemplateRef<any>;
	//行样式
	@Input() rowClass;
	//空数据时提示信息
	@Input() messages: any = {
		emptyMessage: "<img src='assets/images/table/noData.svg'>"
	};
	//选中的数据
	@Input() set selected(v) {
		this.allSelect = v;
		this.resetSelect(v);
	};
	//选中数据对比的属性
	@Input() selectedProp: string='id'
	//是否为前端分页
	@Input() pageByWeb:boolean=false;
	//表格构造信息
	@Input()
	get tableFrame() { return this.tableFrameParse }
	set tableFrame(v) {
		//获取最后一个属性
		let rColumn = _.takeRight(v.filter(item => item.type !== 'checkbox' && item.type !== 'actions' && item.ifOrder !== 0), 2);

		if(rColumn && rColumn.length === 2) {
			this.lastColumnProp = rColumn[0].extStringOne;
		}

		this.tableFrameParse = v;
		this.tableOrigin = v;
		this.parseRowsAndFrame(this.tableData, v);
		this.actionW = this.scrollbarH ? (97 - this.dataTable.scrollbarHelper.width) : 160 ;
	}
	//是否显示column(从控制器过来)
	@Input() showDataColumn: any = {};
	//分页数据
	@Input()
	get pageDTO() { return this.pageData; }
	set pageDTO(data) { 
		//前端分页计算currentSize
		if(this.pageByWeb || data.currentSize === null) {
			if(data.pageCount-1 >= data.pageNo && data.totalCount >= data.pageSize){
				data.currentSize = data.pageSize;
			}else{
				data.currentSize = data.totalCount % data.pageSize;
			}
		}
		this.pageData = Object.assign({}, this.pageData, data); 
		this.tableResize();
	}
	//TABLE数据
	@Input()
	get rows() { return this.tableData; }
	set rows(rowData) {
		this.originTableData = rowData;

		this.tableData = rowData;

		if(this.pageByWeb && rowData && rowData.length >= this.pageData.pageSize) {
			this.setPage({offset: this.pageData.pageNo, pageSize: this.pageData.pageSize});
		}
		
		this.parseRowsAndFrame(rowData, this.tableFrame);

		//重置选中数据
		this.resetSelect(this.allSelect);
		// 解决table宽度不能100%问题
		this.tableResize();
	}

	//事件分享
	//选择
	@Output() select: any = new EventEmitter<any>();
	//激活
	@Output() activate: any = new EventEmitter<any>();
	//分页
	@Output() searchData: any = new EventEmitter<any>();
	//排序
	@Output() sort: any = new EventEmitter<any>();
	//按钮事件回调
	@Output() cb: any = new EventEmitter<any>();
	//默认td宽度
	public defaultWidth: number = 150;
	//保存table数据
	public tableData: any = [];
	//保存原始table数据
	private originTableData: any=[];
	//分页
	public pageData: any = {};
	//解析后的头部信息
	public parsetableFrame: any = [];
	//解析后的头部
	public tableFrameParse: any = [];
	public tableOrigin: any = [];
	//当前语言
	public lang: string = 'zh_CN';
	//所有权限
	private authAll: any=[];
	//当前页面选中的数据
	public _selected: any=[];
	//历史选中的数据
	private historySelect: any=[];
	//所有选中的数据
	private allSelect: any=[];
	//操作按钮宽度设置
	public actionW: number;
	//最后一列属性宽度
	public lastColumnProp: string = '';


	constructor(
		// private _i18n: I18nService,
		// private _store: StorageService
	) { 
		// this.authAll = this._store.getObject('auth') || [];
	}

	ngOnInit() {
		// this._i18n.langChange().subscribe(res => {
		// 	this.lang = res;
		// })
	}

	resize(e) {
		let _sLeft = this.dataTable.element.getElementsByClassName('datatable-body')[0].scrollLeft;
		if(_sLeft && this.scrollbarH) {
			this.dataTable.element.getElementsByClassName('datatable-body')[0].scrollLeft 
			= this.dataTable.element.getElementsByClassName('datatable-body')[0].scrollLeft
				+ e.newValue - e.column.width;
		}
	}

	/**
	 * 选中的数据回显
	 */
	resetSelect(v) {
		if(v) {
			let _select = [...v];
			let currentPageSelect = [];

			//重置历史选中数据（不包括当前页面选中的数据）
			this.historySelect = [];

			_select.forEach(item => {
        if(!item){
          return;
        }
				let _rowSelect = this.tableData.filter(row => row[this.selectedProp] === item[this.selectedProp]);
				if(this.rowClass) item.checked = _rowSelect.length > 0 ? true : false;
				if(_rowSelect.length) {
					if(this.rowClass) _rowSelect[0].checked = true;
					currentPageSelect.push(_rowSelect[0]);
				}else {
					this.historySelect.push(item);
				}
			})

			//重置当前页面选中的数据
			this._selected = currentPageSelect;
		}
	}

	// 是否显示操作栏
	hasAuth(auths){
		if(auths) {
			let flag = false;

			auths.forEach(item => {
				if(!flag && (item === '' || this.authAll.indexOf(item) !== -1)) flag = true;
			});
	
			return flag;
		}else {
			return true;
		}
	}

	//解析数据
	parseRowsAndFrame(rowData, tableFrame) {
		//防止无效解析
		if (!this.tableOrigin.length) return false;

		//存储重复的头信息，用于过滤头部数组，如页面传过来三个prop:dataType,过滤后只保留一个
		let _repeatHeader = [];
		//保存头部数据
		let _tableFrame = [];

		this.tableOrigin.forEach((item, index) => {
			//如果为true，则添加到_tableFrame数组中
			let flag = true;

			if (item.shows) {
				if (item.shows.indexOf('R_') === -1) {
					//控制头部显示或者隐藏
					item.show = this.showByCtrl(item);
				} else {
					//显示列
					item.show = true;

					//控制内容区域显示或者隐藏
					this.tableData = this.showByRow(item, this.tableData);

					item.showByData = true;
					//过滤头列表
					_repeatHeader.includes(item.prop) ? flag = false : _repeatHeader.push(item.prop);
				}
			} else {
				if(item.show !== false){
					item.show = true;
				}
			}

			if (flag) _tableFrame.push(item);

		});

		setTimeout(() => {
			//重新给tableFrame赋值
			this.tableFrameParse = _tableFrame.length === 0 ? [...this.tableOrigin] : [..._tableFrame];
			// fix 当滚动到某表格中间时置空表格，再次填充数据表格内容不对齐问题： https://github.com/swimlane/ngx-datatable/issues/1577
			const parentElement = this.dataTable.element;
			const datatableBody = parentElement.querySelector(".datatable-body");
      		datatableBody.scrollTo(0, 1);
			this.actionByRow(this.tableFrameParse);
		})
		
	}


	//解析头部是否显示的参数(通过控制器控制列是否显示),demo:'C_stepDataType:I_0 || C_stepDataType:I_1 || C_stepDataType:I_2'
	showByCtrl(item) {
		let arr = item.shows.split(' ');
		let parseResult = '';
		for (let arg of arr) {
			if (arg.indexOf(':') !== -1) {
				let _arg = arg.split(':');
				parseResult = parseResult + this.sourceParse(_arg);
			} else {
				parseResult = parseResult + arg;
			}
		}

		return eval(parseResult);
	}


	sourceParse(param, row: any = {}) {
		let _keyParse = param[0].split('_');
		let _valueParse = param[1].split('_');
		let _startMerge = _keyParse[0] + _valueParse[0];
		let _value = _valueParse[1];

		if(_valueParse.length > 2) {
			_valueParse.shift();
			_value = _valueParse.join("_");
		}	

		switch (_startMerge) {
			case 'CC': return this.showDataColumn[_keyParse[1]] + this.isEqualTarget(_value, 'C');
			case 'CI': return "'" + this.showDataColumn[_keyParse[1]] + "'" + this.isEqualTarget(_value, 'I');
			case 'CR': return this.showDataColumn[_keyParse[1]] + this.isEqualTarget(_value, 'R');
			case 'RI': return '"' + row[_keyParse[1]] + '"' + this.isEqualTarget(_value, 'I');
		}
	}

	actionsParse(param, row) {
		let arr = param.split(" ");
		let parseResult = '';
		for (let arg of arr) {
			if (arg.indexOf(':') !== -1) {
				let _arg = arg.split(':');
				parseResult = parseResult + this.sourceParse(_arg, row);
			} else {
				parseResult = parseResult + arg;
			}
		}
		return eval(parseResult);
	}


	//解析数据是== 还是!=,传入格式为I_0或者I_!0
	isEqualTarget(data, type) {
		let _equalParse = '';
		let _arg = data.indexOf('!') === -1 ? data : data.substr(1);

		switch (type) {
			case 'C': _equalParse = this.showDataColumn[_arg]; break;
			case 'I': _equalParse = '"' + _arg + '"'; break;
			case 'R': _equalParse = '';
		}

		return (data.indexOf('!') === -1 ? '==' : '!=') + _equalParse;
	}


	showByRow(item, rowData) {
		rowData.forEach((row, index) => {
			let _tArr = item.shows.split(':');
			let _value = '';

			if (_tArr[1].indexOf("{") !== -1) {
				let _start = _tArr[1].indexOf("{");
				let _end = _tArr[1].indexOf("}");

				_value = _tArr[1].substring(_start + 1, _end);
				_tArr[1] = _tArr[1].substring(0, _start);
			}

			if (eval(this.sourceParse(_tArr, row))) {
				row.pipes = item.pipes;
			}
		})
		return rowData;
	}

	//通过行数据解析是否需要显示按钮(存在ngIf的情况)
	actionByRow(data) {
		if (data && data[data.length - 1] && data[data.length - 1].actions) {
			data[data.length - 1].actions.forEach((item, index) => {
				if (item.shows) {
					this.tableData.forEach((child, index1) => {
						//添加一个隐藏的属性，如hide0，则隐藏第一个按钮
						child['hide' + index] = !this.actionsParse(item.shows, child);
					})
				}
			})
		}
	}

	//解决table宽度不能100%问题
	tableResize() {
		setTimeout(() => {
			let evObj = document.createEvent('Event');
			evObj.initEvent('resize', true, true);
			window.dispatchEvent(evObj);
		}, 100);
  	}
  
	//选择
	onSelect(event: any) {
		this.select.emit({selected: this.historySelect.concat(event.selected)}); 
	}
	//激活
	onActivate(event: any) { this.activate.emit(event); }
	//分页查询
	setPage(e: any) {

		if(this.pageByWeb){
			//前端分页
			let _data = [];
			this.originTableData.forEach(item => {
				_data.push(Object.assign({},item));
			})
			let _startIndex = e.offset * e.pageSize;
			
			this.tableData = _data.splice(_startIndex, e.pageSize);

			this.parseRowsAndFrame(this.tableData, this.tableFrame);

			// 解决table宽度不能100%问题
			this.tableResize();

			//重置选中数据
			this.resetSelect(this.allSelect);

			this.pageData = Object.assign({}, this.pageData, {
				pageSize: e.pageSize,
				pageNo: e.offset,
				pageCount: Math.ceil(this.originTableData.length / e.pageSize),
				totalCount: this.originTableData.length
			});

			//计算currentSize
			if(this.pageData.pageCount-1 >= e.offset) {
				this.pageData.currentSize = e.pageSize;
			}else {
				this.pageData.currentSize = this.originTableData.length % e.pageSize;
			}

			//重新计算pageNo
			if(this.pageData.currentSize === 0 && this.pageData.pageNo > 0) {
				this.pageData.pageNo = this.pageData.pageNo - 1;
				this.pageData.currentSize = e.pageSize;
				this.tableData = _data.splice( this.pageData.pageNo * e.pageSize, e.pageSize);
			}

			//前端分页
			this.searchData.emit({
				offset: this.pageData.pageNo,
				pageSize: e.pageSize
			}); 
		}else{
			//后端分页
			this.searchData.emit(e); 
		}
	}
	//排序
	onSort(event: any) { this.sort.emit(event); }
	//按钮事件回调
	actionsFun(event: any) { this.cb.emit(event); }
}