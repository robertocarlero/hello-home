import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import type { ZardIcon } from '@shared/components/icon/icons';

interface Feature {
  icon: ZardIcon;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-eco-features',
  imports: [CommonModule, ZardIconComponent],
  templateUrl: './eco-features.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcoFeaturesComponent {
  protected readonly features: Feature[] = [
    {
      icon: 'sprout',
      title: 'Natural',
      subtitle: 'Finish',
    },
    {
      icon: 'sparkles',
      title: 'Eco',
      subtitle: 'Innovation',
    },
    {
      icon: 'heart',
      title: 'Sustainable',
      subtitle: 'Materials',
    },
  ];
}
