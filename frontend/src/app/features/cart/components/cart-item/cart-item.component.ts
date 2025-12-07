import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/cart-item.interface';
import { ZardIconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, CurrencyPipe, ZardIconComponent],
  templateUrl: './cart-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  item = input.required<CartItem>();

  increaseQuantity = output<CartItem>();
  decreaseQuantity = output<CartItem>();
  removeItem = output<string>();

  onIncrease(): void {
    this.increaseQuantity.emit(this.item());
  }

  onDecrease(): void {
    this.decreaseQuantity.emit(this.item());
  }

  onRemove(): void {
    this.removeItem.emit(this.item().product.id);
  }

  getSubtotal(): number {
    return this.item().product.price * this.item().quantity;
  }
}
