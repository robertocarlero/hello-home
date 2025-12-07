import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturedProductsComponent } from '@features/products/components/featured-products/featured-products';
import { HeroBannerComponent } from '@features/home/components/hero-banner/hero-banner';
import { MissionStatementComponent } from '@features/home/components/mission-statement/mission-statement';

@Component({
  selector: 'app-home',
  imports: [HeroBannerComponent, MissionStatementComponent, FeaturedProductsComponent],
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
