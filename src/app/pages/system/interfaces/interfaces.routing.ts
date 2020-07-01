import { Routes, RouterModule } from '@angular/router';
import { OmsInterfacesComponent } from './interfaces.component';

const APP_ROUTES: Routes = [
  { path: '', component: OmsInterfacesComponent }
];

export const RoutingModule = RouterModule.forChild(APP_ROUTES);