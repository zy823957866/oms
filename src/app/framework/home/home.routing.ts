// 工具包
import { Routes, RouterModule } from '@angular/router';

// 组件
import { HomeComponent } from './home.component';

const APP_ROUTES: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            {
                path: 'system',
                loadChildren: () => import('../../pages/system/system.module').then(m => m.SystemModule),
            }
        ]
    }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);