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
import { PaymentRequest } from '../../models/payment-request.interface';
import { generateOrderId } from '@shared/utils/order.utils';
import { ZardAlertDialogService } from '@shared/components/alert-dialog/alert-dialog.service';
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
  private readonly alertDialog = inject(ZardAlertDialogService);

  readonly cartItems = this.cartService.cartItems;
  readonly orderSummary = computed(() =>
    this.checkoutService.calculateOrderSummary(this.cartItems())
  );

  readonly currentStep = signal<'customer' | 'review' | 'quote'>('customer');
  readonly customerData = signal<CheckoutFormData | null>(null);

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
    const customerData = this.customerData();
    const paymentRequest = this.buildPaymentRequest(quote, customerData!);
    this.processPayment(paymentRequest);
  }

  private buildPaymentRequest(
    quote: QuoteResponse,
    customerData: CheckoutFormData
  ): PaymentRequest {
    const orderId = generateOrderId();

    return {
      quoteId: quote.quoteId,
      currency: quote.finalCurrency,
      amount: quote.finalAmount,
      payer: {
        fullName: customerData.fullName,
        email: customerData.email,
        documentType: customerData.documentType,
        document: customerData.document,
        cellPhone: `+${customerData.cellPhone}`,
      },
      referenceId: orderId,
      description: `Order ${orderId}`,
      redirectUrl: `${window.location.origin}/checkout/payment-result`,
    };
  }

  private processPayment(paymentRequest: PaymentRequest): void {
    toast.loading('Processing payment...');

    this.checkoutService.createPayment(paymentRequest).subscribe({
      next: (paymentResponse) => {
        toast.dismiss();
        this.showPaymentRedirectDialog(paymentResponse.paymentLink);
      },
      error: (error) => {
        this.handlePaymentError(error);
      },
    });
  }

  private showPaymentRedirectDialog(paymentUrl: string): void {
    const dialogRef = this.alertDialog.confirm({
      zTitle: 'Redirect to Payment',
      zContent:
        'You will be redirected to the payment gateway to complete your purchase. Do you want to continue?',
      zOkText: 'Continue',
      zCancelText: 'Cancel',
      zOkDestructive: true,
      zOnOk: () => {
        return {};
      },
    });

    dialogRef.afterClosed.subscribe((confirmed) => {
      if (confirmed as boolean) {
        this.redirectToPayment(paymentUrl);
      } else {
        this.showManualPaymentLink(paymentUrl);
      }
    });
  }

  private redirectToPayment(paymentUrl: string): void {
    window.location.href = paymentUrl;
  }

  private showManualPaymentLink(paymentUrl: string): void {
    toast.info('Payment link ready', {
      description: 'Click the link below to complete your payment',
      duration: Infinity,
      action: {
        label: 'Go to Payment',
        onClick: () => this.redirectToPayment(paymentUrl),
      },
    });
  }

  private handlePaymentError(error: any): void {
    toast.dismiss();
    toast.error('Payment creation failed', {
      description: error.error?.message || error.message || 'Please try again',
    });
  }

  goToStep(step: 'customer' | 'review' | 'quote'): void {
    this.currentStep.set(step);
  }

  async cancelCheckout(): Promise<void> {
    await this.router.navigate(['/cart']);
  }
}
