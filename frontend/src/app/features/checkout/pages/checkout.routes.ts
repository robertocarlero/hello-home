import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { cartNotEmptyGuard } from '../../cart/guards/cart-not-empty.guard';

export const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [cartNotEmptyGuard],
  },
];
