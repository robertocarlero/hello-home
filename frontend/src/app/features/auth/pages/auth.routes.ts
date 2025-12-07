import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile/profile';
import { authGuard } from '@features/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
];
