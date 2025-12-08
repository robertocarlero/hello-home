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

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, CustomerFormComponent, OrderReviewComponent, OrderSummaryComponent],
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

  readonly currentStep = signal<'customer' | 'review'>('customer');
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

  async onOrderSubmit(): Promise<void> {
    const data = this.customerData();
    if (!data) {
      toast.error('Missing customer information');
      this.currentStep.set('customer');
      return;
    }

    const summary = this.orderSummary();
    const result = await this.checkoutService.processOrder(data, summary);

    if (result.success) {
      toast.success('Order placed successfully!', {
        description: `Order ID: ${result.orderId}`,
      });
      this.cartService.clearCart();
      await this.router.navigate(['/']);
    } else {
      toast.error('Order failed', {
        description: result.error || 'Please try again',
      });
    }
  }

  goToStep(step: 'customer' | 'review'): void {
    this.currentStep.set(step);
  }

  async cancelCheckout(): Promise<void> {
    await this.router.navigate(['/cart']);
  }
}
