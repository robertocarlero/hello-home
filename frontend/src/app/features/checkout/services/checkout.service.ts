import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../cart/models/cart-item.interface';
import { CheckoutFormData } from '../models/checkout-form-data.interface';
import { OrderSummary } from '../models/order-summary.interface';
import { QuoteRequest } from '../models/quote-request.interface';
import { QuoteResponse } from '../models/quote-response.interface';
import { PaymentRequest } from '../models/payment-request.interface';
import { PaymentResponse } from '../models/payment-response.interface';
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

  requestQuote(orderTotal: number, currency: string): Observable<QuoteResponse> {
    const apiUrl = `${GlobalConfig.apiUrl}/quotes`;

    const quoteRequest: QuoteRequest = {
      orderTotal: orderTotal * 100,
      initialCurrency: 'USD',
      finalCurrency: currency,
    };

    return this.http.post<QuoteResponse>(apiUrl, quoteRequest);
  }

  createPayment(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    const apiUrl = `${GlobalConfig.apiUrl}/payments`;
    return this.http.post<PaymentResponse>(apiUrl, paymentRequest);
  }

  getCountries(): Observable<any> {
    const apiUrl = `${GlobalConfig.apiUrl}/countries`;
    return this.http.get<any>(apiUrl);
  }

  getCurrencies(countryCode: string): Observable<any> {
    const apiUrl = `${GlobalConfig.apiUrl}/countries/${countryCode}/currencies`;
    return this.http.get<any>(apiUrl);
  }
}
