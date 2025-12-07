import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Category } from '../../models/category.interface';
import { CategoryCardComponent } from '../category-card/category-card';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './category-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  categories = input.required<Category[]>();
  title = input<string>();
  description = input<string>();
  navigate = output<Category>();
}
