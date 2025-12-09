import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-status-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderStatusCardComponent {
  order = input.required<any>();
  retry = output<string>();

  onRetry(): void {
    if (this.order().payment?.paymentLink) {
      this.retry.emit(this.order().payment?.paymentLink);
    }
  }
}
