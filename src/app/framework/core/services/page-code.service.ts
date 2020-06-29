// 工具包
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { drop } from 'lodash';

// 服务
import { HttpApiService } from './http.service';

@Injectable()

export class OmsPageCodeService {
    //请求table THEAD部分的API
    public url: string = '/api-option/v1/viewCloumn/queryClounmnByTable.do';
    
    constructor(
        public router: Router,
        public httpSer: HttpApiService
    ) {}

    getPageCode(layer: any = null): string {
        let _url = this.router.url;
        let code = drop(_url.split('/'), 2).join('_');

        if(layer) {
            code = code + '_' + layer;
        }

        return code;
    }

    getTableHeader(layer) {
        this.getPageCode(layer);
    }
}