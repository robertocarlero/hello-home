import { Routes } from '@angular/router';
import { ProfilePageComponent } from './profile/profile';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
];
