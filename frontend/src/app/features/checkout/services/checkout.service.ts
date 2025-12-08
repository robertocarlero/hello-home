import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../cart/models/cart-item.interface';
import { CheckoutFormData } from '../models/checkout-form-data.interface';
import { OrderSummary } from '../models/order-summary.interface';
import { QuoteRequest } from '../models/quote-request.interface';
import { QuoteResponse } from '../models/quote-response.interface';
import { generateOrderId } from '@shared/utils/order.utils';
import { GlobalConfig } from '@core/config/global.config';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly http = inject(HttpClient);
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

  requestQuote(orderTotal: number): Observable<QuoteResponse> {
    const apiUrl = `${GlobalConfig.apiUrl}/quotes`;

    const quoteRequest: QuoteRequest = {
      orderTotal,
      initialCurrency: 'USD',
      finalCurrency: 'COP',
    };

    return this.http.post<QuoteResponse>(apiUrl, quoteRequest);
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
