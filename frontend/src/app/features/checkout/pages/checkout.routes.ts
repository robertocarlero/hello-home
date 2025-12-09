import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from '@core/guards/auth.guard';
import { cartNotEmptyGuard } from '../../cart/guards/cart-not-empty.guard';

export const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [authGuard, cartNotEmptyGuard],
  },
  {
    path: 'payment-result',
    loadComponent: () =>
      import('./payment-result/payment-result.component').then((m) => m.PaymentResultComponent),
    canActivate: [authGuard],
  },
];
