import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@features/products/services/products.service';
import { CategoryListComponent } from '@features/products/components/category-list/category-list';

@Component({
  selector: 'app-home-categories-list-container',
  standalone: true,
  imports: [CommonModule, CategoryListComponent],
  templateUrl: './home-categories-list-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCategoriesListContainerComponent {
  private productsService = inject(ProductsService);
  categories$ = this.productsService.getCategories();

  protected readonly categoriesTitle = `Explore our thoughtful and planet-first <span class="font-serif italic text-emerald-800">Categories</span>`;

  onNavigate(category: any) {
    console.log('Navigate to category:', category);
    // TODO: Implement navigation
  }
}
