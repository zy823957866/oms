import { OnInit, ViewChild, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

// 服务
import { HttpApiService } from '../../services/http.service';
import { DictionaryService } from '../../services/dictionary.service';
import { StructureService } from '../../services/structure.service';
import { MomentService } from '../../services/moment.service';
import { ExcelService } from '../../services/excel.service';
import { MessageService } from '../../services/message.service';
import { InitDictionaryService } from '../../services/init-dictionary.service';
import { OmsDownloadPageService } from '../../services/download-page.service';


// 配置
import { SYSTEM_CONFIG } from '../../config/system.config';

// model
import { PageDTO } from '../../models/page.model';
import { Order } from '../../models/order.model';
import { SearchItem } from '../../models/search-item.model';
import { FormCbData } from '../../models/form-cb.module';

// 组件
import { OmsDownloadColumnComponent } from '../download-column/download-column.component';
import { OmsPageCodeService } from '../../services/page-code.service';


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
    //表头code
    public headCode: string = '';
    //页面code
    public code: any = null;
    //table数据
    public rows: any[] = [];
    //选中项
    public selected: any[] = [];

    // 子类覆盖该属性
    public apiPath: any = {};
    // 子类覆盖该属性
    public formConfig: any = {};
    // 子类覆盖该属性
    public formErrors: any = {};
    // 子类覆盖该属性
    public validationMessages: any = {};
    // 导出文件名
    public exportName: string;
    
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
        onSearch: false
    };

    // =================基类基本属性和方法 start===================
    protected httpApiService: HttpApiService;
    protected formBuilder: FormBuilder;
    protected messageSer: MessageService;
    protected initDict: InitDictionaryService;
    protected dialog: MatDialog;
    protected dictionaryService: DictionaryService;
    protected excelService: ExcelService;
    protected structureService: StructureService;
    protected translate: TranslateService;
    protected downPageSer: OmsDownloadPageService;
    protected pageCodeSer: OmsPageCodeService
    protected _moment: MomentService;

    constructor(public injector: Injector){
        this.httpApiService = this.injector.get(HttpApiService);
        this.formBuilder = this.injector.get(FormBuilder);
        this.messageSer = this.injector.get(MessageService);
        this.initDict = this.injector.get(InitDictionaryService);
        this.dialog = this.injector.get(MatDialog);
        this.dictionaryService = this.injector.get(DictionaryService);
        this.excelService = this.injector.get(ExcelService);
        this.structureService = this.injector.get(StructureService);
        this.translate = this.injector.get(TranslateService);
        this.downPageSer = this.injector.get(OmsDownloadPageService);
        this.pageCodeSer = this.injector.get(OmsPageCodeService);
        this._moment = this.injector.get(MomentService);
    }
    

    ngOnInit() {
        // 获取当前页面code码
        this.getPageCode();

        // 创建表单
        this.createForm();

        // 表格数据初始化加载
        this.setPage({ offset: 0 });
    }


    // 创建form
    createForm() {
        this.searchForm = this.formBuilder.group(this.formConfig);
    }

    // 获取code
    getPageCode() {
        this.headCode = this.pageCodeSer.getPageCode(this.code);
    }

    // 获取表头数据
    getPageHeader() {
        
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
        console.log(e)
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

    // 新增
    onNew() {
        
    }

    // 批量删除
    onDeleteByIds() {

    }

    // 设置选中的数据
    onSelect(e) {
        this.selected = e.selected;
    }

    // 下载
    onDownLoadPage(data) {
        console.log(this.tableFrame)
        this.dialog.open(OmsDownloadColumnComponent, {
            disableClose: true,
            width: '50%',
            height: 'auto',
            data: this.tableFrame
        }).afterClosed().subscribe(res => {
            if(res) {
                console.log(data.type)
                switch(data.arg){
                    
                    case 'all': this.onDownLoadAllPage(data.type, this.exportName, res); break;
                    case 'current': this.onDownLoadCurrentPage(data.type, this.exportName, res); break;
                    case 'select': this.onDownLoadCurrentPage(data.type, this.exportName, res, data.arg); break;
                }
            }
        })
    }

    //设置导出条件
    downloadEntityDTO() {
        return this.searchForm.getRawValue();
    }

    // 下载所有
    onDownLoadAllPage(type: string, name: any=null, data: any=[]) {
        // 表名、列信息和检索条件...
        let exprotDTO = {
            tableName: name || this.exportName,
            fileType: type,
            fields: this.downPageSer.getFields(data),
            searchDTO: {
                entityDTO: this.downloadEntityDTO(),
                pageDTO: {},
                orderDTOs: this.orderDTOs
            }
        }
        this.loading.download = true;

        // 获取下载链接并下载
        this.httpApiService.exportExcel(this.apiPath[SYSTEM_CONFIG.API.LIST.EXPORT.NAME] + '?resourceId=' + this.httpApiService.getResourceId(), exprotDTO, (name || this.exportName) + '.' + type).subscribe(res => {
            if(res){
                this.loading.download = false;
            } 
        })
    }

    // 下载当前
    onDownLoadCurrentPage(type: string, name: any=null, data: any=[], downType: string = 'current') {
        let _data = downType === 'current' ? this.rows : this.selected;
        if(!_data || _data.length <= 0){
            this.showMessage('没有数据可导出!', 'clear');
            return;
        }
        //导出前初始化所有字典表
        if (SYSTEM_CONFIG.DOWN_LOAD.TYPE.XLSX === type) {
            this.excelService.export2xlsx(this.downPageSer.convert(_data, data), name || this.exportName);
        } else if (SYSTEM_CONFIG.DOWN_LOAD.TYPE.XLS === type) {
            this.excelService.export2xls(this.downPageSer.convert(_data, data), name || this.exportName);
        } else if (SYSTEM_CONFIG.DOWN_LOAD.TYPE.CSV === type) {
            this.excelService.export2csv(this.downPageSer.convert(_data, data), name || this.exportName);
        } else if (SYSTEM_CONFIG.DOWN_LOAD.TYPE.TXT === type) {
            this.excelService.export2txt(this.downPageSer.convert(_data, data), name || this.exportName);
        }
    }
}