import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Category } from '../../models/category.interface';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent],
  templateUrl: './category-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  category = input.required<Category>();
  navigate = output<Category>();

  onShopClick(event: Event) {
    event.stopPropagation();
    this.navigate.emit(this.category());
  }
}
