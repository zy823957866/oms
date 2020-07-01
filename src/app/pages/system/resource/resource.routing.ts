import { Routes, RouterModule } from '@angular/router';
import { OmsResourceComponent } from './resource.component';

const APP_ROUTES: Routes = [
  { path: '', component: OmsResourceComponent }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);