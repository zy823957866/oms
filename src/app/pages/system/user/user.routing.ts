import { Routes, RouterModule } from '@angular/router';
import { OmsUserComponent } from './user.component';

const APP_ROUTES: Routes = [
  { path: '', component: OmsUserComponent }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);