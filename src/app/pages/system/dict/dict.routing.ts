import { Routes, RouterModule } from '@angular/router';
import { OmsDictComponent } from './dict.component';

const APP_ROUTES: Routes = [
  { path: '', component: OmsDictComponent }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);