import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CartService } from '@features/cart/services/cart.service';
import { Product } from '../../models/product.interface';
import { ProductListComponent } from '@features/products/components/product-list/product-list';

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule, ProductListComponent],
  templateUrl: './featured-products.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  featuredProducts$ = this.productsService.getFeaturedProducts();

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
