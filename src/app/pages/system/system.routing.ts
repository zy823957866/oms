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
		]
	}
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);