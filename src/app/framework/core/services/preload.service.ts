/*
 * @Author: zhouyong
 * @Date: 2020-06-13 12:13:08
 * @Description: 预加载控制
 */
// 工具包
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PreloadService implements PreloadingStrategy {
    preloadedModules: string[] = [];

    // 参数 route -- 要加载的路由 load() -- 加载器函数，异步加载带路由的模块
    // 如果该路由应该预加载，就会跳用load()函数返回Observable对象，否则返回null；
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.data && route.data.preload) {
            this.preloadedModules.push(route.path); // 会将所选路由记录在数组中
            return load();
        } else {
            return of(null);
        }
    }
}
