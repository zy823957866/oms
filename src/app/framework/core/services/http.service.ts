//工具包
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { DatePipe } from "@angular/common"
import { cloneDeep } from 'lodash';

//服务
import {UserService} from "./user.service";
import {I18nService} from "./i18n.service";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { MessageService } from './message.service';



@Injectable()
export class HttpApiService {
    //请求缓存,避免短时间相同请求
    private apiSubjects = {};

    constructor(
        public http: HttpClient,
        public router: Router,
        private store: StorageService,
        private userService: UserService, 
        private i18nService:I18nService,
        private datePipe: DatePipe,
        public messageService: MessageService
    ) { }

    /**
     * http get 方法,统一处理http请求头
     * @param url
     */
    get(url: string): Observable<any> {
        return this.http.get<any>(url);
    }

    /**
     * 根据当前路由解析当前资源id
     */
    getResourceId(){
        if(this.store && Object.keys(this.store.getObject('resources')).length) {
            let _resource = this.store.getObject('resources').filter(item => item.resourceUrl === this.router.url);
            return _resource.length > 0 ? _resource[0].id : null;
        }
        return null;
    }
    
    /**
     * 导出文件
    */
    exportFile(url: string, body: any, fileName: string=''){
        let downLoadSubject: BehaviorSubject<any> = new BehaviorSubject('');

        //http返回观察者对象
        let observable = this.http.post(url, body, {
            responseType: "blob",
            headers: new HttpHeaders({
                'AuthorizeToken': this.userService.getToken() || '',
                'Accept-Language': this.i18nService.storedLang() || 'zh_CN',
                "Content-Type": "application/json"
            })
        })
        observable.subscribe(result => {
            if(result.type === 'application/json'){
                //错误信息提示
                let self = this;
                let reader = new FileReader();
                
                reader.onload = function(event){
                    downLoadSubject.next(true);

                    self.messageService.showMessage( reader.result 
                        ? JSON.parse(reader.result.toString()).message 
                        : '导出失败!',
                        'clear'
                    )
                };
                reader.readAsText(result);
            }else{
                //下载流文件
                const _arr = fileName.split('.');
                //获取后缀
                const _type = _arr[_arr.length - 1];
                //删除后缀
                _arr.pop();
                
                //获得file名称
                const _fileName = _arr.join('.');

                this.downloadFile(result, _type, _fileName);

                downLoadSubject.next(true);
            }
        });

        return downLoadSubject;
    }

    //导出数据
    downloadFile(data, type, name) {
        // 下载类型
        let contentType;

        switch(type) {
            case 'xlsx':
                contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
            case 'xls':
                contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
            case 'csv':
                contentType = 'text/csv';
                break;
            case 'txt':
                contentType = 'text/plain';
                break;
            case 'png':
                contentType = 'application/x-png';
                break;
            case 'jpg':
                contentType = 'application/x-jpg';
                break;
            case 'pdf':
                contentType = 'application/pdf';
                break;
            case 'gif':
                contentType = 'image/gif';
                break;
            case 'jpeg':
                contentType = 'image/jpeg';
                break;
            case 'doc':
                contentType = 'application/msword';
                break;
            case 'ppt':
                contentType = 'application/x-ppt';
                break;
        }

        const blob = new Blob([data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
      
        // 以动态创建a标签进行下载
        const a = document.createElement('a');
        const fileName = name + ' ' + this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        a.href = url;
        a.download = fileName + '.' + type;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    //批量下载
	multiDownLoad(url, fileName: string='') {
        if(!url || url === ' ') return false;

        const iframe = document.createElement("iframe");
        iframe.style.display = "none"; // 防止影响页面
        iframe.style.height = '0'; // 防止影响页面
        iframe.src = url; 
        document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
        // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
        setTimeout(()=>{
            iframe.remove();
        }, 5 * 60 * 1000);
	}


    /**
     * http post 方法,统一处理http请求头
     * @param url
     * @param body
     * @param callback
     * @param options loadingType 'login | search | submit'
     *                getAllData 获取所有返回的数据
     */
    post(url: string, body: any, cb: Function, options: any={}): Observable<any> {
        //短时间内,url,body,callback相同则认定为短时间内重复查询,合并为一次查询
        let requestKey = url + JSON.stringify(body);

        if (!this.apiSubjects[requestKey]) {
            //重构url
            let _url = this.getResourceId() ? url + '?resourceId=' + this.getResourceId() : url;

            //http返回观察者对象
            let observable = this.http.post<any>(_url, body, {
                headers: new HttpHeaders({
                    'AuthorizeToken': this.userService.getToken() || '',
                    'Accept-Language': this.i18nService.storedLang() || 'zh_CN',
                    "Content-Type": options.contentType || "application/json;charset=UTF-8"
                })
            });
            observable.subscribe(result => {
                if (result.code == 0 && !(options && options.getAllData)) {
                    let callbacks = this.apiSubjects[requestKey].callbacks;
                    for (let i = 0; i < callbacks.length; i++) {
                        callbacks[i](result.data !== undefined ? cloneDeep(result.data) : {});
                    }
                } else if (result.code !== 0 && result.message != null) {
                    this.messageService.showMessage( result.message || '连接服务器失败!', 'clear' );
                }
                
                if(options && options.getAllData) {
                    if(this.apiSubjects[requestKey]) {
                        let callbacks = this.apiSubjects[requestKey].callbacks;
                        for (let i = 0; i < callbacks.length; i++) {
                            callbacks[i](cloneDeep(result));
                        }
                    }
                }               
            }, err => {
                delete (this.apiSubjects[requestKey]);
            }, () => {
                cb(null);
                delete (this.apiSubjects[requestKey]);
            });

            this.apiSubjects[requestKey] = {
                observable: observable,
                subject: new Subject<Object>(),
                callbacks: [cb]
            };
        } else {
            this.apiSubjects[requestKey].callbacks.push(cb);
        }
        return this.apiSubjects[requestKey].observable;
    }

    //文件上传
    postFile(url: string, param: any, callback: Function) {
        let formData = new FormData();

        for (let key in param) {
            formData.append(key, param[key]);
        }

        const headers = new HttpHeaders();

        let _url = this.getResourceId() ? url + '?resourceId=' + this.getResourceId() : url;

        let observable = this.http.post<any>(_url, formData, {
            headers: headers
        });

        observable.subscribe(result => {callback(result) }, 
        err => {}, 
        () => {
            callback(null);
        });
    }

}