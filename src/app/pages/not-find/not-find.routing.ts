/*
 * @Author: zhouyong
 * @Date: 2020-06-13 11:03:00
 */
// 工具包
import { Routes, RouterModule } from '@angular/router';

// 组件
import { NotFindComponent } from './not-find.component';

const APP_ROUTES: Routes = [
    { path: '', component: NotFindComponent }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);
