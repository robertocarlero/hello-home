import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { toast } from 'ngx-sonner';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.totalItems() === 0) {
    toast.error('Your cart is empty');
    router.navigate(['/cart']);
    return false;
  }

  return true;
};
