import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { adminGuard } from './core/guards/admin.guard';

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
        path: 'checkout',
        loadChildren: () =>
          import('./features/checkout/pages/checkout.routes').then((m) => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/auth/pages/auth.routes').then((m) => m.routes),
      },
      {
        path: 'balances',
        loadChildren: () =>
          import('./features/balances/pages/balances.routes').then((m) => m.BALANCES_ROUTES),
        canActivate: [adminGuard],
      },
    ],
  },
];
