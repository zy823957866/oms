import { Injectable } from '@angular/core';
import { StorageService } from "./storage.service";

@Injectable()
export class UserService {

    constructor(private storageService: StorageService) { }

    // 获取token
    getToken() {
        return this.storageService.get('AuthorizeToken') || null;
    }

    getUser() {
        return this.storageService.get('userInfo');;
    }
}