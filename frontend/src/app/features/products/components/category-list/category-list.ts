import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@core/services/products.service';
import { CategoryCardComponent } from '../category-card/category-card';
import { ZardIconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent, ZardIconComponent],
  templateUrl: './category-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  private productsService = inject(ProductsService);
  categories$ = this.productsService.getCategories();

  onNavigate(category: any) {
    console.log('Navigate to category:', category);
    // TODO: Implement navigation
  }
}
