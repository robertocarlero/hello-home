import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { GlassButtonComponent } from '@shared/components/ui/glass-button/glass-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ZardInputDirective, ZardIconComponent, GlassButtonComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
