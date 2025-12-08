import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { CartItem } from '../../../cart/models/cart-item.interface';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { CheckoutFormData } from '../../models/checkout-form-data.interface';
import { OrderReviewItemComponent } from '../order-review-item/order-review-item.component';

@Component({
  selector: 'app-order-review',
  imports: [CommonModule, ZardButtonComponent, OrderReviewItemComponent],
  templateUrl: './order-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReviewComponent {
  customerData = input.required<CheckoutFormData>();
  cartItems = input.required<CartItem[]>();
  isProcessing = input.required<boolean>();

  back = output<void>();
  submit = output<void>();

  onBack(): void {
    this.back.emit();
  }

  onSubmit(): void {
    this.submit.emit();
  }
}
