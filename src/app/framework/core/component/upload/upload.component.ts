// 工具包
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UploadFile, UploaderOptions, UploadInput, UploadStatus } from 'ngx-uploader';
import { isEmpty } from 'lodash';
import * as SparkMD5 from 'spark-md5';

// 服务
import { MessageService } from '../../services/message.service';

// 配置
import { UPLAOD_CONFIG } from './upload.config';

// 常用方法
import { accDiv } from '../../utils/shared';

// 实例
import { FileData } from './upload.interface';
import { isArray } from 'jquery';
import { HttpApiService } from '../../services/http.service';


@Component({
    selector: 'oms-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
    // 按钮
    @ViewChild('singleUploadBtn') singleUploadBtn;

    @Input() showDownloadTemp: boolean = true;          // 是否有模板下载
    @Output() downloadTempCb = new EventEmitter<any>(); // 模板下载回调

    @Input() label: string = "上传";
    @Input() width: string = '100%';                    // 容器宽度
    @Input() height: string = '350px';                  // 容器高度

    @Input() uploadSingle: boolean = false;             // 文件上传类型 'single' | 'multi'

    @Input() limitSize: number = 5;                     // 单个文件最大限制

    _accept: string[];                                  // 接收的文件格式
    @Input() set accept(v) {
            if(v && isArray(v) && v.length) {
                this.acceptMsg = `请上传${v.join('、')}格式文件`;
                this._accept = v;
            }
        }
        get accept() { return this._accept; }

    @Input() set historyUpload(v) {                     // 历史上传文件
        if(v && isArray(v) && v.length) {
            this.uploadDatas = [];

            v.forEach(it => {
                this.uploadDatas.push( Object.assign({}, it, this.singleUpload(it), {
                    historyUpload: true
                }));
            })
            console.log(this.uploadDatas)
        }
    }

    @Output() cb: EventEmitter<any> = new EventEmitter();


    // 操作按钮
    ACTIONS = UPLAOD_CONFIG.ACTIONS;
    CONFIG  = UPLAOD_CONFIG.CONFIG;

    // 上传文件类型提示信息
    acceptMsg: string = this.CONFIG.ACCETP_TIPS;
    // 需要上传的文件
    files: UploadFile[]=[];
    // 需要传给后台的数据
    uploadDatas: any=[];
    // 上传文件
    uploadInput = new EventEmitter<UploadInput>();
    // 文件上传个数|格式控制
    options: UploaderOptions={ concurrency: this.uploadSingle ? 1 : 20, maxUploads: 100};
    // 是否为加载中
    isLoading: boolean = false;

    constructor(
        public mesSvr: MessageService,
        public httpSvr: HttpApiService
    ) {
        this.setAcceptMsg();
    }

    // 下载模板
    downloadTemp() {
        this.downloadTempCb.emit();
    }

    fileChange(event) {
        let len = this.uploadSingle ? 0 : this.uploadDatas.length;
        this.getMD5(event, len);
    }

    //获取MD5码
    onDrop(event) {
        if(event) {
            console.log()
            for(let i = 0; i < event.dataTransfer.files.length; i++) {
                this.getMD5(event.dataTransfer.files[i], this.uploadDatas.length - event.dataTransfer.files.length + i);
            }
        }
    }

    getMD5(event, index) {
        console.log(index)
        let self = this;
        let blobSlice = File.prototype.slice || File.prototype['mozSlice'] || File.prototype['webkitSlice'];
        let file = event.target ? event.target.files[0] : event;

        let chunkSize = 2097152,
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            fileReader = new FileReader();
       
        fileReader.onload = function (e) {
            spark.append(e.target['result']);
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                self.uploadDatas[index] = Object.assign({}, self.uploadDatas[index], {
                    File: file,
                    fileCode: spark.end(),
                    historyUpload: false
                });
            }
        };

        function loadNext() {
            var start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
    }

    // 获取md5对应的文件
    getFileByIndex(index) {
        return this.uploadDatas.slice(index, index+1);
    }


    // 文件放置
    onUploadOutput(output) {
        if (output.type === 'allAddedToQueue') {
            const event: UploadInput = {
              type: 'uploadAll',
              url: 'https://ngx-uploader.com/upload',
              method: 'POST',
              data: { foo: 'bar' }
            };
            
            this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            this.uploadSingle 
                ? this.uploadDatas = [this.singleUpload(output.file)]
                : this.uploadDatas.push(this.singleUpload(output.file));

        } else if ((output.type === 'uploading' && typeof output.file !== 'undefined') || output.type === 'done') {
            const index = this.uploadDatas.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.uploadDatas[index] = Object.assign({}, this.uploadDatas[index], this.singleUpload(output.file));

        } else if (output.type === 'cancelled' || output.type === 'removed') {
            this.uploadDatas = this.uploadDatas.filter(file => file.file !== output.file);
        }
        
        if(output.type === 'done') {
            this.emitFileData();
        }
    }

    // 单个文件上传
    singleUpload(file) {
        let fileInfo: FileData;

        fileInfo = {
            id: file.id,
            size: this.transUnit(file.size),
            suffix: this.fileSuffix(file.name),
            name: file.name,
            file: file
        };

        // 格式校验
        fileInfo.errorMsg = this.validFileType(fileInfo.suffix) || this.fileLimit(file);
        
        //根据图片展示缩略图片
        fileInfo.img = this.thumb(fileInfo.suffix);

        return fileInfo;
    }

    // 文件下载
    downloadFile(file) {
        this.httpSvr.exportFile('/api-file/v1/fileInfo/download.do', {id: file.fileCode}, file.name);
    }


    // 去除重复的上传数据
    filterRepeat(arr) {
        let map = new Map();
        let array = new Array();

        for(let i=0; i<arr.length; i++) {
            if(!map.get(arr[i].fileCode)) {
                map.set(arr[i].fileCode, true);
                array.push(arr[i]);
            }
        }

        return array;
    }

    // 将数据分享给父组件
    emitFileData() {
        this.cb.emit(this.uploadDatas);
    }


    // 获取文件名
    fileName(name): string {
        return name.replace(/\.\w+$/,'');
    }


    // 获取文件后缀
    fileSuffix(name = ''): string {
        return name.replace(/.+\./,'').toLowerCase();
    }


    // 文件格式校验, 返回错误信息
    validFileType(suffix = ''): string{
        if((this.uploadSingle && (isEmpty(this.accept) ? this.CONFIG.SUPPORT.TYPE_SINGLE.indexOf(suffix) : this.accept) === -1)
        || (!this.uploadSingle && (isEmpty(this.accept) ? this.CONFIG.SUPPORT.TYPE_MULTI.indexOf(suffix) : this.accept) === -1))
            return this.CONFIG.SUPPORT.TIPS;
        else 
            return null;
    }


    // 文件最大限制
    fileLimit(file: UploadFile): string {
        if(this.limitSize && file.size > this.limitSize * 1024 * 1024) {
            return this.CONFIG.MAX_SIZE_TIPS.replace('$', this.limitSize.toString());
        }
        return null;
    }


    // 根据索引清除文件
    clear(i) {
        this.singleUploadBtn.nativeElement.value = null;
        this.uploadDatas.splice(i, 1);

        this.emitFileData();
    }

    // 文件大小转换
    transUnit(size = 0) {
        let step = 1024;

        if(size < step) {
            return size + 'B';
        } else if(size >= step && size < Math.pow(step, 2)){
            return accDiv(size, step, 2) + 'KB';
        } else if(size >= Math.pow(step, 2) && size < Math.pow(step, 3)) {
            return accDiv(size, Math.pow(step, 2), 2) + 'MB';
        } else if(size >= Math.pow(step, 3) && size < Math.pow(step, 4)) {
            return accDiv(size, Math.pow(step, 3), 2) + 'GB';
        }
    }

    // 设置缩略图
    thumb(type): string {
        switch(type) {
            case 'pptx' :
            case 'ppt'  : return 'ppt';
            case 'doc'  : return 'doc';
            case 'jpg'  :
            case 'jpeg' :
            case 'png'  :
            case 'bmp'  :
            case 'gif'  : return 'bmp';
            case 'xls'  :
            case 'xlsx' : return 'exl';
            case 'txt'  : return 'txt';
			case 'pdf'  : return 'pdf';
            default     : return 'blank';
        }
    }

    // 设置提示信息
    setAcceptMsg() {
        setTimeout(() => {
            this.acceptMsg = this.acceptMsg.replace('$', 
            this.uploadSingle 
                ? this.CONFIG.SUPPORT.TYPE_SINGLE.join('、')
                : this.CONFIG.SUPPORT.TYPE_MULTI.join('、')
            );
        });
    }

    // 按钮回调
    actionsCb(e) {
        console.log(e)
    }
}
