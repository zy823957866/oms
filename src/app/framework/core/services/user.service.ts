import { Injectable } from '@angular/core';
import { StorageService } from "./storage.service";

@Injectable()
export class UserService {

    private user: any;

    constructor(private storageService: StorageService) { }

    getToken() {
        //TODO 1.首先从user中获取token
        let token = (this.user ? this.user.token : null);
        //TODO 2.如果不存在从StorageService中加载
        if (!token) {
            token = this.storageService.get('AuthorizeToken');
        }
        //TODO 3.如果还不存在,则跳转登陆页面,提示未登录
        return token;
    }

    getUser() {
        return this.storageService.get('userInfo');;
    }
}