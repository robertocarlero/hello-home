import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from '../../../auth/services/auth.service';
import { OrderStatusCardComponent } from '../../components/order-status-card/order-status-card.component';
import { OrderResponse } from '@features/checkout/models/order-response';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule, OrderStatusCardComponent],
  templateUrl: './payment-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentResultComponent implements OnInit {
  private readonly checkoutService = inject(CheckoutService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  order = signal<OrderResponse | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    const user = this.authService.currentUser();

    this.isLoading.set(true);
    this.checkoutService.getOrderByUserId(user!.userId.toString()).subscribe({
      next: (order) => {
        this.order.set(order);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onRetryPayment(paymentLink: string): void {
    window.location.href = paymentLink;
  }

  onContinueShopping(): void {
    this.router.navigate(['/']);
  }
}
