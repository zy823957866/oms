import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil, throttleTime } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'oms-select',
    styleUrls: ['./select.component.scss'],
    templateUrl: './select.component.html'
})

export class OmsSelectComponent {
    @ViewChild('singleSelect') singleSelect: MatSelect;
	@ViewChild('multiSelect') multiSelect: MatSelect;

	//dict_key
	@Input() dic_key: any='DIC_KEY';
	//dic_value
	@Input() dic_value: any='DIC_VALUE';
	//同步下拉数据是否可以为空值
	@Input() syncOptionsCanNull: boolean=false;
	//下拉框数据是否为异步
	@Input() 
		get syncOptions () { return this._syncOptions;}
		set syncOptions(v) {
			this._syncOptions = v;
			if((v && v.length > 0) || this.syncOptionsCanNull) this.getSelect(v);
			this.patchValue(this.syncOptions, this._value);
		};
	//属性绑定的值
    @Input() formCtrlName: any = null;
	//占位符
	@Input() label: string="";
	//是否需要请选择
	@Input() showDefault: boolean=false;
	//是否为多选
	@Input() multifySelect: boolean=false;
	// input间距
    @Input() gap: number=40;
    // 每行多少个input
	@Input() colSpan: number=null;
	// 是否为点击的下拉框
	@Input() selectWithClick: boolean=false;
	//form表单
    @Input() form;
	//列表
	@Input() 
		set options(v) {
			if(v) {
                this._options = v;
				v.subscribe(res => {
					//防止options为异步加载异常
					if(this._value && res && res.length>0) this.patchValue(res,this._value);
					this.getSelect(res);
				})
			} else {
				this.getSelect([]);
			}
		};
	//是否禁用
	@Input() 
		set disabled(v) { v ? this.modelCtrl.disable() : this.modelCtrl.enable(); };
	//是否为必填
	@Input()
		set isRequired(v){
			setTimeout(() => {
				if(v && !this._value) {
					if(this.syncOptions && this.syncOptions.length>0) {
						this.patchValue(this.syncOptions, this._value);
					}else {
						this._options.subscribe(res => {
							if(res && res.length>0) this.patchValue(res,this._value);
						})
					}
				}
			});
		}
	// 错误信息
    @Input() set formErrors(v) {
        if(v) {
            this._formErrors = v;
			this._required = ((this.form ? this.form.controls[this.formCtrlName].hasError('required') : true) && this._formErrors[this.formCtrlName] !== undefined ) 
				? true : false;
        }
	}
	
	//监听值的变化，主要用于页面中的重置功能
	@Input()
    set value(v) {this.multifySelect ? this.checkboxValue(v) : this.raidoValue(v); }

	//下拉框改变回调
	@Output() selectV: any=new EventEmitter<any>();
	// 点击事件回调
  	@Output() clickInput: any=new EventEmitter<any>();

	//下拉数据集
	protected optionList: any[] = [];
	//保存数据
	public modelCtrl: FormControl = new FormControl();
	//过滤器控制
	public optionFilterCtrl: FormControl = new FormControl();
	//过滤后的数据
	public filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
	//销毁事件
	protected _onDestroy = new Subject<void>();
	//当前选择，用于重置功能，对比数据，防止数据重复赋值(patchValue)
	private currentSelect: any;
	_value: any;
	//下拉
	public _options: ReplaySubject<any> = new ReplaySubject<any>(1);
    //未搜索到数据
	noData:string = this.translate.instant('PUBLIC.NO_DATA_WAS_FOUND');
	_syncOptions: any=[];
	filterData: string='';
	//错误提示信息
	_formErrors: any={};
	//是否必填
  _required: boolean=false;
  modelCtrlChangeSub: Subscription;
	
	
	constructor(
        private  translate: TranslateService
    ) {  }

	ngOnInit() {
		//获取下拉数据
		if(!this.syncOptions) {
			this._options.subscribe(res => {
				this.getSelect(res);
			})
		}
	}

	ngAfterViewInit() {
		this.setInitialValue();
	}

	ngOnDestroy() {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	//单选设置value
	raidoValue(v){
		//单选
		this._value= v;
		if( v !== this.currentSelect) {
			if(v===null) {
				this.modelCtrl.patchValue({
					name: null,
					id: null
				});
			}else {
				if(this.syncOptions && this.syncOptions.length>0) {
					
					this.patchValue(this.syncOptions, v);
				}else {
					this._options.subscribe(res => {
						if(res && res.length>0) this.patchValue(res,v);
					})
				}
			}
		}else if(v === this.currentSelect && v) {
			this.modelCtrl.patchValue({
				name: this.formCtrlName,
				id: v
			});
		}
	}

	//多选设置
	checkboxValue(v) {
		//多选
		// if(v !== this.currentSelect && v && v.length > 0) {
		if(v) {
			if(this.syncOptions && this.syncOptions.length>0) {
				this.patchValue(this.syncOptions, v);
			}else {
				this._options.subscribe(res => {
					if(res && res.length>0) this.patchValue(res,v);
				})
			}
		}else {
			// this.modelCtrl.patchValue([]);
		}	
	}



	//设置下拉框选中的值
	patchValue(data,v) {
		if(this.multifySelect) {
			let patchData = [];

			if(data && data.length) {
				//多选时候 获取指定的ids
				data.forEach(item => {
					if(v && v.includes(item[this.dic_key])){
						patchData.push({
							name: item[this.dic_value],
							id: item[this.dic_key]
						})
					}
				});
			}

			this.modelCtrl.patchValue(patchData);

		}else {
			let patchData = {name: null, id: null};
			if(data && data.length){
				let _default = data.filter(child => child[this.dic_key]===v)[0];
				if(_default && _default[this.dic_value]) {
					patchData = Object.assign({}, {
						name: _default[this.dic_value],
						id: _default[this.dic_key]
					})
				}
			}

			this.modelCtrl.patchValue(patchData);
		}
		
	}

	//获取下拉数据并处理
	getSelect(data) {
		if (data && data.length) {
			//设计基础下拉框数据结构
			this.optionList = [];
			data.forEach(child => {
				this.optionList.push({
					name: child[this.dic_value],
					id: child[this.dic_key]
				})
			})

		}else {
			this.optionList = [];

			this.multifySelect ? this.modelCtrl.patchValue([]) : this.modelCtrl.patchValue({name: null, id: null});
		}

		if(this.modelCtrlChangeSub){
			this.modelCtrlChangeSub.unsubscribe();
		}
    
		//model改变事件
		this.modelCtrlChangeSub = this.modelCtrl.valueChanges.pipe(throttleTime(100)).subscribe(res => {
			if(res === '') {
				this.modelCtrl.patchValue({
					name: null,
					id: null
				});
			}

      		let emitVal  = {};
			if(this.multifySelect) {
				if(res === null) return false;
				//多选时候传id的数组
				let emitId = [];
				res.forEach(item => { emitId.push( item.id ); });
        		emitVal = {
					prop: this.formCtrlName,
					value: emitId
				};
				this.currentSelect = emitId;
			}else {
				if((res && res.id !== null) || res===''){
          			emitVal ={
						prop: this.formCtrlName,
						value: (res&&res.id !== null)?res.id: null
					};
					this.currentSelect = res.id;
				}
      		}

			this.selectV.emit(emitVal);
		})

		//过滤数据改变
		this.optionFilterCtrl.valueChanges
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => {
				this.filterData = res;
				this.filterOptionss();
			});

		//过滤
		this.filteredOptions.next(this.optionList.slice());
	}

	protected setInitialValue() {
		this.filteredOptions
			.pipe(take(1), takeUntil(this._onDestroy))
			.subscribe(() => {
				let _select = this.multifySelect ? this.multiSelect : this.singleSelect ;
				
				_select.compareWith = (a: any, b: any) => a && b && a.id === b.id;
			});
	}

	protected filterOptionss() {
		if (!this.optionList) {
			return;
		}

		//获取查询条件
		let search = this.optionFilterCtrl.value;
		if (!search) {
			this.filteredOptions.next(this.optionList.slice());
			return;
		} else {
			search = search.toLowerCase();
		}

		this.filteredOptions.next(
			this.optionList.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
		);
	}

	//select点击事件
	selectClick() {
		this.clickInput.emit();
	}
}