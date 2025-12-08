import { CartItem } from '../../cart/models/cart-item.interface';

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}
