import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../cart/models/cart-item.interface';
import { CheckoutFormData } from '../models/checkout-form-data.interface';
import { OrderSummary } from '../models/order-summary.interface';
import { generateOrderId } from '@shared/utils/order.utils';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly TAX_RATE = 0.19; // 19% IVA

  private readonly _checkoutData = signal<Partial<CheckoutFormData>>({});
  readonly checkoutData = this._checkoutData.asReadonly();

  private readonly _isProcessing = signal<boolean>(false);
  readonly isProcessing = this._isProcessing.asReadonly();

  calculateOrderSummary(items: CartItem[]): OrderSummary {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const tax = subtotal * this.TAX_RATE;
    const total = subtotal + tax;

    return {
      items,
      subtotal,
      tax,
      total,
    };
  }

  updateCheckoutData(data: Partial<CheckoutFormData>): void {
    this._checkoutData.update((current) => ({ ...current, ...data }));
  }

  clearCheckoutData(): void {
    this._checkoutData.set({});
  }

  async processOrder(
    formData: CheckoutFormData,
    orderSummary: OrderSummary
  ): Promise<{ success: boolean; orderId?: string; error?: string }> {
    this._isProcessing.set(true);

    try {
      const orderId = generateOrderId();

      this._isProcessing.set(false);
      this.clearCheckoutData();

      return {
        success: true,
        orderId,
      };
    } catch (error) {
      this._isProcessing.set(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }
}
