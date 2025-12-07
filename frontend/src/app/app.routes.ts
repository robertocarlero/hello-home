import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/pages/home.routes').then((m) => m.routes),
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/pages/cart.routes').then((m) => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/auth/pages/auth.routes').then((m) => m.routes),
      },
    ],
  },
];
