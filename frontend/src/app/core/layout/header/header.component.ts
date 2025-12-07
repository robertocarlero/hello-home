import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { GlassButtonComponent } from '@shared/components/ui/glass-button/glass-button.component';
import { CartService } from '@features/cart/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [ZardInputDirective, ZardIconComponent, GlassButtonComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  readonly cartService = inject(CartService);

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
