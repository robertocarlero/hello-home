import { Product } from '@features/products/models/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}
