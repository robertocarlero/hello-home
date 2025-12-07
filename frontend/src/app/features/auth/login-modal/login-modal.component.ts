import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@features/auth/auth.service';
import { GlassButtonComponent } from '@shared/components/ui/glass-button/glass-button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardInputDirective } from '@shared/components/input/input.directive';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GlassButtonComponent,
    ZardIconComponent,
    ZardInputDirective,
  ],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['test@example.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required]],
  });

  isLoading = signal(false);
  error = signal<string | null>(null);

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.error.set(null);

      const { email, password } = this.loginForm.value;

      this.authService.login({ email: email!, password: password! }).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.close.emit(true);
        },
        error: () => {
          this.isLoading.set(false);
          this.error.set('Invalid email or password');
        },
      });
    }
  }
}
