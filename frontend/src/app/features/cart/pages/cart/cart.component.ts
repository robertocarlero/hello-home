import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '@features/auth/services/auth.service';
import { CartItem } from '../../models/cart-item.interface';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardAlertDialogService } from '@shared/components/alert-dialog/alert-dialog.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartCheckoutSummaryComponent } from '../../components/cart-checkout-summary/cart-checkout-summary.component';
import { LoginModalComponent } from '@features/auth/login-modal/login-modal.component';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    ZardButtonComponent,
    ZardIconComponent,
    CartItemComponent,
    CartCheckoutSummaryComponent,
    LoginModalComponent,
  ],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private readonly router = inject(Router);
  private readonly alertDialog = inject(ZardAlertDialogService);
  private readonly authService = inject(AuthService);
  readonly cartService = inject(CartService);

  showLoginModal = signal(false);

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
    if (!this.authService.isAuthenticated()) {
      toast.error('You must be logged in to proceed to checkout');
      this.showLoginModal.set(true);
      return;
    }

    this.router.navigate(['/checkout']);
  }

  onLoginSuccess(success: boolean): void {
    this.showLoginModal.set(false);
    if (success) {
      this.router.navigate(['/checkout']);
    }
  }
}
