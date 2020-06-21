/**
 * @desc HTTP返回拦截器
 * @date 2019.04.17
 */
//工具包
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// 服务
import { MessageService } from '../services/message.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(
        private message: MessageService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            mergeMap((event: any) => {
                // 正常返回，处理具体返回参数
                if (event instanceof HttpResponse && event.status === 200) {
                    return this.handleData(event);//具体处理请求返回数据
                }
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => this.handleData(err)))
    }

    //页面跳转
    goto(url: String) {
        this.router.navigate([url]);
    }

    //连接状态错误类型
    private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
        // 业务处理：一些通用操作
        switch (event.status) {
            case 200:
                if (event instanceof HttpResponse) {
                    return of(event);
                }
                break;


            case 401: // 未登录状态码
                if (event instanceof HttpErrorResponse) {
                    this.message.showMessage(event['error'] ? event['error'].message : '登录超时，请重新登录', 'clear');
                }
                this.dialog.closeAll();
                //记录跳转位置
                window.localStorage.setItem('redictUrl', this.router.url);
                this.goto('/login');
                return of(event);


            case 404:
                this.message.showMessage('请求路径不存在!', 'clear');
                return of(event);


            case 415:
                this.message.showMessage(event['error'] ? event['error'].message : '不支持的附件类型!', 'clear');
                return of(event);


            case 500:
                if (event instanceof HttpResponseBase) {
                    // 500 报错信息最低5s
                    this.message.showMessage(event['error'].message, 'clear', 5000);
                }
                return of(event);

                
            default:
                return of(event);
        }
        return of(event);
    }
}