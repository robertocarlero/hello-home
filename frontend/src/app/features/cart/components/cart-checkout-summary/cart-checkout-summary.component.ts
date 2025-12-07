import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-cart-checkout-summary',
  imports: [CommonModule, CurrencyPipe, ZardButtonComponent],
  templateUrl: './cart-checkout-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCheckoutSummaryComponent {
  totalItems = input.required<number>();
  totalPrice = input.required<number>();

  checkout = output<void>();
  continueShopping = output<void>();
  clearCart = output<void>();

  onCheckout(): void {
    this.checkout.emit();
  }

  onContinueShopping(): void {
    this.continueShopping.emit();
  }

  onClearCart(): void {
    this.clearCart.emit();
  }
}
