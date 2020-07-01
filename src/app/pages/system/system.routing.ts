//工具
import { Routes, RouterModule } from '@angular/router';

// 组件
import { OmsRoutingComponent } from '../../framework/core/component/routing/routing.component';

const APP_ROUTES: Routes = [
	{
		path: '',
		component: OmsRoutingComponent,
		children: [
            { path: 'view', loadChildren: () => import('./view/view.module').then(m => m.SystemViewModule) },
            { path: 'dict', loadChildren: () => import('./dict/dict.module').then(m => m.OmsDictModule) },
            { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.OmsRoleModule) },
            { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.OmsUserModule) },
            { path: 'resource', loadChildren: () => import('./resource/resource.module').then(m => m.OmsResourceModule) },
            { path: 'interfaces', loadChildren: () => import('./interfaces/interfaces.module').then(m => m.OmsInterfacesModule) },
		]
	}
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);