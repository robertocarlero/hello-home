import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@core/services/products.service';
import { ProductListComponent } from '@features/products/components/product-list/product-list';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './featured-products.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent {
  private productsService = inject(ProductsService);
  featuredProducts$ = this.productsService.getFeaturedProducts();

  onAddToCart(product: any) {
    console.log('Added to cart:', product);
  }
}
