// 工具包
import { Routes, RouterModule } from '@angular/router';

// 组件
import { LoginComponent } from './login.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent}
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);
