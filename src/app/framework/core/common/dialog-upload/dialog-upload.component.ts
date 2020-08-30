// 工具包
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// 服务
import { MessageService } from '../../services/message.service';
import { HttpApiService } from '../../services/http.service';

// 配置
import { UPLAOD_CONFIG } from './dialog-upload.config';


@Component({
    selector: 'app-dialog-upload',
    templateUrl: './dialog-upload.component.html',
    styleUrls: ['./dialog-upload.component.scss']
})
export class DialogUploadComponent implements OnInit {

    // 操作按钮
    ACTIONS = UPLAOD_CONFIG.ACTIONS;

    // 加载状态
    loading = { onSubmit: false };
    // 需要上传的文件
    uploadData = [];


    /**
     * data: 
     * `{
     *      showDownloadTemp    : boolean   // 是否显示模板下载
     * 
     *      downloadTemp        : {         // 模板下载相关参数
     *                                 url      : string    
     *                                 body     : any
     *                                 fileName : string
     *                             }
     *      label               : string    // 按钮名称
     *      width               : string    // 容器高度
     *      height              : string    // 容器宽度
     *      uploadSingle        : boolean   // 是否为单文件上传
     *      limitSize           : number    // 单个文件上传大小限制 【ps: 单位为MB】
     *      accept              : array     // 接收的文件类型
     *      historyUpload       : array     // 历史上传文档
     * 
     *      uploadFile          : {         // 文件上传参数
     *                                 url      : string    
     *                                 body     : any
     *                             }
     *      uploadFileCb        : function  // 特殊按钮回调  
     * }`
     * 
     * 
     * uploadFileCb中的funcion写法如下:
     * 
     *      const cb = (e) => { console.log(e) }
     *      uploadFileCb: cb
     * 
     * historyUpload = [{ 
     *      fileCode: 'xxx'
     *      fileName: 'xxx'
     *      filePath: 'xxx'
     * }]
     * 
     */

    constructor(
        public messageSrv: MessageService,
        public httpSrv: HttpApiService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
        this.data = Object.assign({}, UPLAOD_CONFIG.DEFAULT_CONFIG, this.data);
    }


    ngOnInit() { }


    // 按钮回调
    change(e) {
        this.uploadData = [...e];
    }


    // 按钮回调
    actionsCb(e) { 
        if(e === 'onSubmit') this.onSubmit();
        else this.data.uploadFileCb();
    }


    // 检验文件格式是否正确
    validFile() {
        let flag = true;
        
        for(let i=0; i < this.uploadData.length; i++) {
            let msg = this.uploadData[i].errorMsg;

            if(msg) {
                this.messageSrv.showMessage(msg, 'clear');
                flag = false;
                break;
            }
        }

        return flag;
    }


    // 提交
    onSubmit() {
        if(!this.uploadData.length) {
            this.messageSrv.showMessage('请选择需要上传的文件!', 'clear');
            return;
        }

        if(this.validFile()) {
            const { body, url } = this.data.uploadFile;
            let param = body;
            let fileCodes = [];

            this.uploadData.forEach(it => fileCodes.push(it.fileCode));

            param = Object.assign({}, param, {
                fileCode: this.data.uploadSingle ? fileCodes[0] : fileCodes
            })

            this.loading.onSubmit = true;

            this.httpSrv.post(url, param, res => {
                if(!res) {
                    this.loading.onSubmit = false;
                    return;
                }
                this.messageSrv.showMessage('文件上传成功')
            })
        }
    }


    // 模板下载
    downloadTemp(e) {
        const { url, body, name } = this.data.downloadTemp;

        this.httpSrv.exportFile(url, body, name);
    }
}
