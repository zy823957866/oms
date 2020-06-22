import { OnInit, ViewChild, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

// 服务
import { HttpApiService } from '../../services/http.service';
import { DictionaryService } from '../../services/dictionary.service';
import { StructureService } from '../../services/structure.service';
import { MomentService } from '../../services/moment.service';
import { DownLoadService } from '../../services/download.service';
import { ExcelService } from '../../services/excel.service';
import { MessageService } from '../../services/message.service';

// 配置
import { SYSTEM_CONFIG } from '../../config/system.config';

// model
import { PageDTO } from '../../models/page.model';
import { Order } from '../../models/order.model';
import { SearchItem } from '../../models/search-item.model';

import { FormCbData } from '../../models/form-cb.module';



export abstract class BaseComponent implements OnInit {
    //table实例对象
    @ViewChild('dataTable') public table: any;

    //分页配置
    public pageDTO: PageDTO = SYSTEM_CONFIG.PAGE_DTO;
    //排序条件
    public orderDTOs: Array<Order> = [];
    //加载动画条
    public loadingIndicator: boolean = false;
    //查询
    public searchForm: FormGroup;
    public searchItems: SearchItem;
    //table数据
    public rows: any[] = [];
    //选中项
    public selected: any[] = [];

    //子类覆盖该属性
    public apiPath: any = {};
    //子类覆盖该属性
    public formConfig: any = {};
    //子类覆盖该属性
    public formErrors: any = {};
    //子类覆盖该属性
    public validationMessages: any = {};
    
    //表格头部信息
    public tableFrame: any = [];

    //message显示参数全局定义
    public tableMessage = {
        emptyMessage: "<img src='assets/images/table/noData.svg'>",            
        totalMessage: '总数',           
        selectedMessage: '已选择'
    };
    // 查询状态
    loading: any={
        onSearch: true
    };

    // =================基类基本属性和方法 start===================
    protected httpApiService: HttpApiService;
    protected formBuilder: FormBuilder;
    protected messageSer: MessageService;
    protected dialog: MatDialog;
    protected dictionaryService: DictionaryService;
    protected excelService: ExcelService;
    protected structureService: StructureService;
    protected downloadService: DownLoadService;
    protected translate: TranslateService;
    protected _moment: MomentService;

    constructor(public injector: Injector){
        this.httpApiService = this.injector.get(HttpApiService);
        this.formBuilder = this.injector.get(FormBuilder);
        this.messageSer = this.injector.get(MessageService);
        this.dialog = this.injector.get(MatDialog);
        this.dictionaryService = this.injector.get(DictionaryService);
        this.excelService = this.injector.get(ExcelService);
        this.structureService = this.injector.get(StructureService);
        this.downloadService = this.injector.get(DownLoadService);
        this.translate = this.injector.get(TranslateService);
        this._moment = this.injector.get(MomentService);
    }
    

    ngOnInit() {
        // 创建表单
        this.createForm();

        // 表格数据初始化加载
        this.setPage({ offset: 0 });
    }


    // 创建form
    createForm() {
        this.searchForm = this.formBuilder.group(this.formConfig);
    }


    // 查询之前插槽
    beforeSearch() {}


    // 查询之后插槽
    setPageData(data) {}


    // 设置查询条件
    setSearchParam() {
        return {
            entityDTO: this.searchForm.getRawValue(),
            pageDTO: this.pageDTO,
            orderDTOs: this.orderDTOs
        }
    }


    //基本查询方法
    setPage(page, flag: boolean=false, type: string="onSearch") {

        //查询之前执行的方法
        this.beforeSearch();

        this.pageDTO.pageNo = page.offset;
        if (!isNaN(page.pageSize)) {
            this.pageDTO.pageSize = page.pageSize;
        }

        // 加载中状态控制
        this.loadingIndicator = true;
        if(flag) { this.loading[type] = true; }

        this.httpApiService.post(this.apiPath[SYSTEM_CONFIG.API.LIST.QUERY_PAGE.NAME], this.setSearchParam(), data => {
            if(data === null){
                // 加载中状态控制
                this.loading[type] = false;
                this.loadingIndicator = false;
            } else { 
                // 获取数据
                this.rows = data.records;

                // 记录分页器数据
                this.pageDTO = Object.assign({}, this.pageDTO, data.pageDTO);

                // 进入回调插槽
                this.setPageData(data); 
            }
        });
    }


    //分页查询方法
    onSearch(flag: boolean=false, type: string="onSearch") {
        this.pageDTO.pageNo = 0;
        this.selected = [];
        this.setPage({ offset: this.pageDTO.pageNo }, flag, type);
    }


    //重置方法
    onReset(flag: boolean=false, type: string="onReset") {
        for (let item in this.formConfig) {
            this.searchForm.patchValue({
                [item]: this.formConfig[item][0]
            })
        }
        this.selected = [];
        this.orderDTOs = [];
        this.setPage({ offset: 0 }, flag, type);
    }

    // 显示提示消息
    showMessage(message: string  = '', icon: string = 'check', time: number = SYSTEM_CONFIG.MESSAGE.duration) {
        this.messageSer.showMessage(message, icon, time);
    }

    // 数据改变
    vChange(e) {
        this.searchForm.patchValue({ [e.prop]: (e && e.value !== null ? e.value : null ) });
        //为带点击的输入框时候 点击清除按钮 清除内容
        if(e.originProp) {
            e.originProp.forEach(item => { this.searchForm.patchValue({ [item]: null }) })
        }
    }

    // 表单回调
    formCb(e: FormCbData) {
        if(typeof e.data === 'string') {
            // 返回的方法名
            this[e.data]();
        }else {
            this.vChange(e.data);

            // 条目如果有回调方法，则执行回调方法
            if(e.item && e.item.cb) this[e.item.cb](e);
        }
    }

}