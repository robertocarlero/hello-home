import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { CartItem } from '@core/models/cart-item.interface';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartCheckoutSummaryComponent } from './components/cart-checkout-summary/cart-checkout-summary.component';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    ZardButtonComponent,
    ZardIconComponent,
    CartItemComponent,
    CartCheckoutSummaryComponent,
  ],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private readonly router = inject(Router);
  readonly cartService = inject(CartService);

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    } else {
      this.removeItem(item.product.id);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
    }
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  checkout(): void {
    // TODO: Implement checkout functionality
    alert('Checkout functionality coming soon!');
  }
}
