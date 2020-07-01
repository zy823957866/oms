import { Routes, RouterModule } from '@angular/router';
import { OmsRoleComponent } from './role.component';

const APP_ROUTES: Routes = [
  { path: '', component: OmsRoleComponent }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);