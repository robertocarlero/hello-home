import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  products = input.required<Product[]>();
  addToCart = output<Product>();
}
