import { Routes, RouterModule } from '@angular/router';
import { SystemViewComponent } from './view.component';

const APP_ROUTES: Routes = [
  { path: '', component: SystemViewComponent }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);