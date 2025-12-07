import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { GlassButtonComponent } from '@shared/components/ui/glass-button/glass-button.component';
import { CartService } from '@features/cart/services/cart.service';
import { AuthService } from '@features/auth/auth.service';
import { LoginModalComponent } from '@features/auth/login-modal/login-modal.component';

import { ZardAlertDialogService } from '@shared/components/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-header',
  imports: [ZardInputDirective, ZardIconComponent, GlassButtonComponent, LoginModalComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  readonly cartService = inject(CartService);
  readonly authService = inject(AuthService);
  private readonly dialogService = inject(ZardAlertDialogService);

  showLoginModal = signal(false);

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  openLoginModal(): void {
    this.showLoginModal.set(true);
  }

  closeLoginModal(): void {
    this.showLoginModal.set(false);
  }

  logout(): void {
    this.dialogService
      .confirm({
        zTitle: 'Sign out',
        zContent: 'Are you sure you want to sign out?',
        zOkText: 'Sign out',
        zCancelText: 'Cancel',
        zOkDestructive: true,
        zOnOk: () => {
          return {};
        },
      })
      .afterClosed.subscribe((result) => {
        if (result) {
          this.authService.logout();
        }
      });
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
