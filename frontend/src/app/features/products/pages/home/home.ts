import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products';

@Component({
  selector: 'app-home',
  imports: [HeroBannerComponent, FeaturedProductsComponent],
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
