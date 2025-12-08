import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutFormData } from '../../models/checkout-form-data.interface';
import { toast } from 'ngx-sonner';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { OrderReviewComponent } from '../../components/order-review/order-review.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { QuotePaymentComponent } from '../../components/quote-payment/quote-payment.component';
import { QuoteResponse } from '../../models/quote-response.interface';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    CustomerFormComponent,
    OrderReviewComponent,
    OrderSummaryComponent,
    QuotePaymentComponent,
  ],
  templateUrl: './checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly cartItems = this.cartService.cartItems;
  readonly orderSummary = computed(() =>
    this.checkoutService.calculateOrderSummary(this.cartItems())
  );

  readonly isProcessing = this.checkoutService.isProcessing;

  readonly currentStep = signal<'customer' | 'review' | 'quote'>('customer');
  readonly customerData = signal<CheckoutFormData | null>(null);
  readonly quoteData = signal<QuoteResponse | null>(null);

  readonly initialFormValues = computed<Partial<CheckoutFormData>>(() => {
    const existingData = this.customerData();
    if (existingData) return existingData;

    const user = this.authService.currentUser();
    if (user) {
      return {
        fullName: user.name,
        email: user.email,
      };
    }

    return {};
  });

  readonly disabledFormFields = computed<string[]>(() => {
    const user = this.authService.currentUser();
    if (user) {
      return ['fullName', 'email'];
    }
    return [];
  });

  onCustomerFormSubmit(data: CheckoutFormData): void {
    this.customerData.set(data);
    this.currentStep.set('review');
  }

  onOrderReview(): void {
    const data = this.customerData();
    if (!data) {
      toast.error('Missing customer information');
      this.currentStep.set('customer');
      return;
    }
    this.currentStep.set('quote');
  }

  onQuoteConfirmed(quote: QuoteResponse): void {
    this.quoteData.set(quote);
    toast.success('Quote confirmed', {
      description: 'Proceeding to payment...',
    });
    // TODO: Navigate to payment step when implemented
  }

  goToStep(step: 'customer' | 'review' | 'quote'): void {
    this.currentStep.set(step);
  }

  async cancelCheckout(): Promise<void> {
    await this.router.navigate(['/cart']);
  }
}
