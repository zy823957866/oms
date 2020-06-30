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
import { OmsFormService } from '../../services/form.service';
import { StorageService } from '../../services/storage.service';
import { OmsConfirmComponent } from '../confim/confirm.component';
import { OmsAlertComponent } from '../alert/alert.component';


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
    // 跟新组件(弹框)
    public addComponent: any;
    
    //表格头部信息
    public tableFrame: any = [];
    // 是否可以单击改变背景颜色
    public clickChangeTableBg: boolean=false;

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
    protected pageCodeSer: OmsPageCodeService;
    protected storeSer: StorageService;
    protected formSer: OmsFormService;
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
        this.storeSer = this.injector.get(StorageService);
        this.formSer = this.injector.get(OmsFormService);
        this._moment = this.injector.get(MomentService);
    }
    

    ngOnInit() {
        // 获取当前页面code码
        this.getPageCode();

        // 获取table表头数据
        this.getPageHeader();

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
        this.pageCodeSer.getTableHeader(this.code).subscribe(res => {
            if (Object.keys(res).length) this.tableFrame = res;
        });
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
        this.searchForm.patchValue({ [e.prop]: e.value });
        //为带点击的输入框时候 点击清除按钮 清除内容
        if(e.originProp) {
            e.originProp.forEach(item => { this.searchForm.patchValue({ [item]: null }) })
        }
    }

    // 表单回调
    formCb(e: FormCbData) {
        if(typeof e.data === 'string') {
            // 返回的方法名
            this[e.data](true, e.data);
        }else {
            this.vChange(e.data);

            // 条目如果有回调方法，则执行回调方法
            if(e.item && e.item.cb) this[e.item.cb](e);
        }
    }


    // 新增传输数据插槽
    data2NewDialog(){
        return {};
    }

    // 新增
    onNew(w: string='50%', h: string='auto', mh: string='0') {
        this.dialog.open(this.addComponent, {
            width: w,
            height: h,
            minHeight: mh,
            data: this.data2NewDialog(),
            disableClose: true
        }).afterClosed().subscribe(result => {
            if (result) this.onSearch();
        });
    }

    // 编辑传输数据插槽
    data2UpdateDialog(row) {
        return { id: row.id }
    }

    // 更新
    onUpdate(row, w: string='50%', h: string='auto', mh: string='0') {
        this.dialog.open(this.addComponent, {
            width: w,
            height: h,
            minHeight: mh,
            data: this.data2UpdateDialog(row),
            disableClose: true
        }).afterClosed().subscribe(result => {
            if (result) this.onSearch();
        });
    }

    // 批量删除之前的校验，判断选中的数据是否可以被删除
    beforeDeleteByIds() { return true; }

    // 批量删除
    onDeleteByIds() {
        if(!this.beforeDeleteByIds()) return;

        if (this.selected && this.selected.length > 0) {
            this.dialog.open(OmsConfirmComponent, {
                disableClose: true, 
                width: '500px',
                data: { 
                    title: '删除确认', 
                    message: '确定要删除所选记录?'
                } 
            }).afterClosed().subscribe(result => {
                if (result) {
                    let ids = [];
                    for (let i = 0; i < this.selected.length; i++) {
                        ids.push(this.selected[i].id);
                    }
                    this.httpApiService.post(this.apiPath[SYSTEM_CONFIG.API.LIST.DELETE_BY_ID_LIST.NAME], ids, data => {
                        if(data){
                            this.showMessage('批量删除成功！');
                            this.onSearch();
                        }
                    });
                }
            });
        } else {
            this.dialog.open(OmsAlertComponent, { 
                disableClose: true, 
                width: '500px',
                data: { 
                    title: '删除确认',
                    message: '请选择需要删除的数据!'
                } 
            });
        }
    }

    // 单条删除方法
    onDelete(row) {
        this.dialog.open(OmsConfirmComponent, { 
            disableClose: true, 
            width: '500px',
            data: { 
                title: '删除确认', 
                message: '确定要删除所选记录?' 
            } 
        }).afterClosed().subscribe(result => {
            if (result) {
                this.httpApiService.post(this.apiPath[SYSTEM_CONFIG.API.LIST.DELETE_BY_ID.NAME], { 'id': row.id }, data => {
                    if(data) this.onSearch();
                });
            }
        });
    }


    // 设置选中的数据
    onSelect(e) {
         //判断是否高亮背景
         if(this.clickChangeTableBg) {
            this.rows.forEach(child => {
                child.checked = e.selected.filter(selectNode => selectNode.id === child.id).length > 0 ? true : false;
            })
        }

        this.selected = e.selected;
    }

    // table中操作按钮回调
    tableCb(arg: any = { data: null, fun: function () {} }) {
        this[arg.fun](arg.data, arg.w, arg.h);
    }

    // 排序
    onSort(event) {
        this.orderDTOs = [];
        for (let i = 0; i < event.sorts.length; i++) {
            this.orderDTOs.push({ propertyName: event.sorts[i].prop, dir: event.sorts[i].dir });
        }
        
        this.setPage({ offset: 0 });
    }

    //是否有双击编辑的权限
    dbClickTestAuth() {
        if(this.tableFrame.length > 0 && this.tableFrame[this.tableFrame.length-1].actions){
            let _actions = this.tableFrame[this.tableFrame.length-1].actions;
            let _authArr = _actions.length > 0 ? _actions.filter(item => item.actionFun === 'onUpdate') : [];
            let _auth = _authArr.length > 0 ? _authArr[0].auth : null

            if(_auth !== null && _auth !== '' && (this.storeSer.getObject('auth') || []).indexOf(_auth) === -1) {
                this.showMessage("对不起，您没有编辑权限，请联系管理员！", "clear");
                return false;
            }
        }
        return true;
    }

    // 双击事件
    dbClick(e) { return true; }

    //多种鼠标事件回调方法
    onActivate(event) {
        if (event.type == SYSTEM_CONFIG.EVENT.MOUSE.DOUBLE_CLICK) {
            //鼠标双击事件
            if(this.dbClick(event) && this.dbClickTestAuth()){
                this.onUpdate(event.row);
            }
        } else if (event.type == SYSTEM_CONFIG.EVENT.MOUSE.ENTER) {
            //鼠标划入事件
            //console.log(event.row);
        } else if (event.type == SYSTEM_CONFIG.EVENT.MOUSE.CLICK) {
            if(this.clickChangeTableBg) {
                //如果不是点击checkbox
                if(
                    event.event.target['className'].indexOf('mat-checkbox-layout') === -1 
                    && event.event.target['className'].indexOf('mat-checkbox-input') === -1
                    && event.event.target['className'].indexOf('mat-checkbox-inner-container') === -1
                ){
                    event.row.checked = !event.row.checked;
                    //单击事件
                    if(this.selected.filter(item => item.id === event.row.id).length === 0) {
                        this.selected = this.selected.concat([event.row]);
                    }else{
                        this.selected = this.selected.filter(item => item.id !== event.row.id);
                    }
                }
            }
        }
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