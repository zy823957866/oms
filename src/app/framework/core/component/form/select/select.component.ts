// 工具包
import { Component,ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil, throttleTime } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'lodash';
// 服务
import { InitDictionaryService } from '../../../services/init-dictionary.service';

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
    
	//属性绑定的值
    @Input() formCtrlName: any = null;

	//占位符
    @Input() label: string="";
    
	//是否需要请选择
    @Input() showDefault: boolean=true;
    
	//是否为多选
    @Input() multifySelect: boolean=false;

	// 是否为点击的下拉框
    @Input() selectWithClick: boolean=false;
    
	//form表单
    @Input() form: FormGroup;

	//列表
    @Input() set options(v) { this.getOptionLists(v) };
    
	//是否禁用
	@Input() set disabled(v) { v ? this.modelCtrl.disable() : this.modelCtrl.enable(); };
	
	// 错误信息
    @Input() set formErrors(v) { this.setFormError(v) }
	
	//监听值的变化，主要用于页面中的重置功能
	@Input() set value(v) { this.setValue(v); }


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
    //未搜索到数据
	noData:string = this.translate.instant('PUBLIC.NO_DATA_WAS_FOUND');
	//错误提示信息
	_formErrors: any={};
	//是否必填
    _required: boolean=false;
    modelCtrlChangeSub: Subscription;
    // 当前选择对象
    private currentSelect: any = {};
	
	
	constructor(
        private initDic: InitDictionaryService,
        private  translate: TranslateService
    ) {  }


    // 解析下拉数据
    getOptionLists(v) {
        if(!v) return;

        if(typeof v === 'string') {

            // 传入initDictionary方法名
            this.initDic[v]().subscribe(res => {
                if(res) this.getSelect(res);
            })
        }else if(isArray(v)){

            // 直接传入数组
            this.getSelect(v);
        } else {

            // 传入观察者对象
            v.subscribe(res => {
                if(res) this.getSelect(res);
            })
        }
    }


    // 设置错误信息及必填
    setFormError(v) {
        if(v) {
            this._formErrors = v;
            this._required = Boolean(this.form.controls[this.formCtrlName].hasError('required') || v[this.formCtrlName] !== undefined)
        }
    }

    // 设置form的值
    setValue(v) {
        if(v === null) {
            this.modelCtrl.patchValue({name: (this.multifySelect ? [] : null), id: null});
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
		this.modelCtrlChangeSub = this.modelCtrl.valueChanges.subscribe(res => {

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
			}else {
				if((res && res.id !== null) || res===''){
          			emitVal ={
						prop: this.formCtrlName,
						value: (res&&res.id !== null) ? res.id: null
					};
				}
      		}

			this.selectV.emit(emitVal);
		})

		//过滤数据改变
		this.optionFilterCtrl.valueChanges
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => {
				this.filterOptions();
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

	protected filterOptions() {
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
    
    ngAfterViewInit() {
		this.setInitialValue();
	}

	ngOnDestroy() {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

}