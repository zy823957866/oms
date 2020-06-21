/*
 * @Author: zhouyong
 * @Date: 2020-06-13 10:50:47
 */
// 工具包
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 组件
import { PreloadService } from './framework/core/services/preload.service';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'oms', loadChildren: () => import('./framework/home/home.module').then(m => m.HomeModule), data: { preload: true } },
    // // 404页面，暂时指向登录
    { path: '**', loadChildren: () => import('./pages/not-find/not-find.module').then(m => m.NotFindModule)}
];




@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadService,
        useHash: false
    })],
    exports: [RouterModule]
})


export class AppRoutingModule { }
