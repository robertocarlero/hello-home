import {
  Component,
  input,
  output,
  signal,
  computed,
  inject,
  effect,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { QuoteResponse } from '../../models/quote-response.interface';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-quote-payment',
  imports: [CommonModule, ZardIconComponent, ZardButtonComponent],
  templateUrl: './quote-payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotePaymentComponent implements OnInit, OnDestroy {
  private readonly checkoutService = inject(CheckoutService);

  readonly orderTotal = input.required<number>();
  readonly quoteConfirmed = output<QuoteResponse>();

  readonly quote = signal<QuoteResponse | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly timeRemaining = signal<number>(45);

  readonly isExpired = computed(() => this.timeRemaining() <= 0);
  readonly canPay = computed(() => this.quote() && !this.isExpired());
  readonly canRequestNewQuote = computed(() => this.quote() && this.isExpired());

  readonly formattedTime = computed(() => {
    const seconds = this.timeRemaining();
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  });

  private timerInterval: number | null = null;

  constructor() {
    effect(() => {
      if (this.quote() && this.timeRemaining() > 0 && !this.timerInterval) {
        this.startTimer();
      }
    });
  }

  ngOnInit(): void {
    this.requestQuote();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  onPay(): void {
    const currentQuote = this.quote();
    if (currentQuote && !this.isExpired()) {
      this.quoteConfirmed.emit(currentQuote);
    }
  }

  requestQuote(): void {
    this.isLoading.set(true);
    this.stopTimer();

    this.checkoutService.requestQuote(this.orderTotal()).subscribe({
      next: (response) => {
        this.quote.set(response);
        const expiresAt = new Date(response.expiresAt);
        const now = new Date();
        const timeDiff = expiresAt.getTime() - now.getTime();
        this.timeRemaining.set(Math.floor(timeDiff / 1000));
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        toast.error('Failed to get quote', {
          description: error.message || 'Please try again',
        });
      },
    });
  }

  onRequestNewQuote(): void {
    this.requestQuote();
  }

  private startTimer(): void {
    this.timerInterval = window.setInterval(() => {
      const current = this.timeRemaining();
      if (current > 0) {
        this.timeRemaining.set(current - 1);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
