import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.interface';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardAlertDialogService } from '@shared/components/alert-dialog/alert-dialog.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartCheckoutSummaryComponent } from '../../components/cart-checkout-summary/cart-checkout-summary.component';

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
  private readonly alertDialog = inject(ZardAlertDialogService);
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
    const dialogRef = this.alertDialog.confirm({
      zTitle: 'Clear Cart',
      zContent:
        'Are you sure you want to clear all items from your cart? This action cannot be undone.',
      zOkText: 'Clear Cart',
      zCancelText: 'Cancel',
      zOkDestructive: true,
    });

    dialogRef.afterClosed.subscribe((result) => {
      if (result) {
        this.cartService.clearCart();
      }
    });
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  checkout(): void {
    this.alertDialog.info({
      zTitle: 'Coming Soon',
      zContent: 'Checkout functionality will be available soon!',
      zOkText: 'OK',
    });
  }
}
