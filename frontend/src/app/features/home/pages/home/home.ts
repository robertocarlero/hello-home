import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturedProductsComponent } from '@features/products/components/featured-products/featured-products';
import { CategoryListComponent } from '@features/products/components/category-list/category-list';
import { HeroBannerComponent } from '@features/home/components/hero-banner/hero-banner';
import { MissionStatementComponent } from '@features/home/components/mission-statement/mission-statement';
import { EcoFeaturesComponent } from '@features/home/components/eco-features/eco-features';

@Component({
  selector: 'app-home',
  imports: [
    HeroBannerComponent,
    MissionStatementComponent,
    FeaturedProductsComponent,
    CategoryListComponent,
    EcoFeaturesComponent,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly heroData = {
    title: 'Eco-Friendly',
    highlight: 'Kitchenware',
    suffix: 'for a greener home',
    subtitle: 'Shop now for sustainable kitchen essentials and make a difference today!',
  };
}
