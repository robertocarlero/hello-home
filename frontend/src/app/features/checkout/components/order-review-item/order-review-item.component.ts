import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../cart/models/cart-item.interface';

@Component({
  selector: 'app-order-review-item',
  imports: [CommonModule],
  templateUrl: './order-review-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReviewItemComponent {
  item = input.required<CartItem>();
}
