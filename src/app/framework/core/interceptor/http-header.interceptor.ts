/**
 * @desc HTTP请求拦截器
 * @date 2020.06.21
 */
//工具包
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

//环境变量
import { environment } from "../../../../environments/environment";

//服务
import { UserService } from "../services/user.service";
import { I18nService } from "../services/i18n.service";



@Injectable()


export class HttpHeaderInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService, 
        private i18nService: I18nService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.userService.getToken();
        let setHeaders = {};
        
        if (token) {
            setHeaders['AuthorizeToken'] = token;
        }

        if (this.i18nService.storedLang()) {
            setHeaders['Accept-Language'] = this.i18nService.storedLang();
        }

        req = req.clone({
            url: environment.APP_DOMAIN + req.url,
            setHeaders: setHeaders
        });

        return next.handle(req)
    }
}