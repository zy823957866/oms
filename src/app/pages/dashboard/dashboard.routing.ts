// 工具包
import { Routes, RouterModule } from '@angular/router';

// 组件
import { DashboardComponent } from './dashboard.component';

const APP_ROUTES: Routes = [
    { path: '', component: DashboardComponent}
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);
