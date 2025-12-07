import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@features/auth/services/auth.service';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardAlertDialogService } from '@shared/components/alert-dialog/alert-dialog.service';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ZardButtonComponent, ZardIconComponent],
  templateUrl: './profile.html',
})
export class ProfilePageComponent {
  private authService = inject(AuthService);
  private dialogService = inject(ZardAlertDialogService);

  user = this.authService.currentUser;

  logout() {
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
}
