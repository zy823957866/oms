// 工具包
import {Inject, Injector} from "@angular/core";
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// 组件
import { BaseComponent } from '../base/base.component';

// 配置
import { SYSTEM_CONFIG } from '../../config/system.config';


export abstract class DialogComponent extends BaseComponent{
    // form
    public addForm: FormGroup;
    // 用于保存错误提示信息
    public formErrors = {};
    // 提示
    public message = {};
    // 有效提示信息
    public validMes = {};
    // 输入框
    public formItems: any;
    // 保存编辑前的数据 ，用于重置
    public resetItems: any;
    // 弹框层数
    public code: any='dialog';
    // 保存状态
    loading: any={ onSubmit: false }


    constructor(
        public injector: Injector,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super(injector);
    }


    ngOnInit() {
        // 查询详情
        this.queryById();

        // 创建form
        this.createForm();
    }


    // 通过id查询详情
    queryById() {
        if (this.data.id) {
            this.httpApiService.post(this.apiPath[SYSTEM_CONFIG.API.LIST.QUERY_BY_ID.NAME], 
                this.GetDataByIdParams(), 
                data => {
                    if(data) {
                        this.resetItems=data;
                        this.addForm.reset(data);
                        this.afterGetDataById(data);
                    }
                }
            );
        }
    }

    // 定义请求参数
    GetDataByIdParams() { return { id: this.data.id }; }

    // 请求初始化数据后执行的方法
    afterGetDataById(data) { }


    // 数据改变回调
    vChange(e){
        this.addForm.patchValue({ [e.prop]: e.value });

        //为带点击的输入框时候 点击清除按钮 清除内容
        if(e.originProp) {
            e.originProp.forEach(item => { this.addForm.patchValue({ [item]: null }) })
        }
    }


    // 创建FORM
    createForm() {
        this.formConfig.version = [null, []];

        // 定义id
        this.formConfig['id'] = [this.data.id || null, []];
        
        this.addForm = this.formBuilder.group(this.formConfig);

        // 重置错误信息
        for (const field in this.formErrors){
            this.formErrors[field] = '';
        }

        this.addForm.valueChanges.subscribe(data => {
            // 监听form变化
            this.formSer.formValueChange( this.addForm, this.formErrors, this.validMes );
        });
        
    }

    // 弹框内数据重置
    onReset() {
        if (this.data.id) {
            this.addForm.reset(this.resetItems);
        } else {
            for(let item in this.formConfig) {
                this.addForm.patchValue({
                    [item] : this.formConfig[item][0]
                })
            }
        }

        // 触摸每一个元素
        this.formSer.touchForms(this.addForm);

        this.afterReset();
    }

    // 重置以后执行的方法
    afterReset() { }


    // 弹框内数据提交
    onSubmit(flag: boolean=false, type: string="onSubmit") {
        // 验证
        if(!this.beforeValid() || !this.formSer.isValid(this.addForm, this.formErrors)) return;

        // 提交数据之前进行的操作
        this.beforePost();

        // 请求接口
        this.data.id ? this.updateById(flag, type) : this.add(flag, type);
    }

    // 验证之前执行的操作
    beforeValid() { return true; }

    //提交数据之前进行的操作
    beforePost() { }


    // 修改
    updateById(flag: boolean, type: string) {
        if(flag) { this.loading[type] = true; }

        this.httpApiService.post(this.apiPath[SYSTEM_CONFIG.API.LIST.UPDATE_BY_ID.NAME], this.addForm.getRawValue(), data => {
            if(data === null) {
                this.loading[type] = false;
            }else{
                this.showMessage(this.translate.instant(this.message['update_sucess']));
                this.close(true);
            }
        });
    }


    // 新增
    add(flag: boolean, type: string) {
        if(flag) { this.loading[type] = true; }

        this.httpApiService.post(this.apiPath[SYSTEM_CONFIG.API.LIST.ADD.NAME], this.addForm.getRawValue(), data => {
            if(data === null){
                this.loading[type] = false;
            }else{
                this.showMessage(this.translate.instant(this.message['add_success']));
                this.close(true);
            }
        });
    }

    //关闭弹框
    close(data){ 
        this.dialogRef.close(data);
    }
}