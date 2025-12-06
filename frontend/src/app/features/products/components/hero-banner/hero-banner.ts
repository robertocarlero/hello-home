import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { EcoButtonComponent } from '@shared/components/ui/eco-button/eco-button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule, NgOptimizedImage, ZardIconComponent, EcoButtonComponent],
  templateUrl: './hero-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroBannerComponent {
  title = input.required<string>(); // "Eco-Friendly"
  highlight = input<string>('Kitchenware'); // "Kitchenware"
  titleSuffix = input<string>('for a greener home'); // "for a greener home"
  subtitle = input<string>(
    'The eco-friendly kitchenware niche with a sense of urgency, much like the original banner.'
  );
}
