import { PaymentPayer } from './payment-payer.interface';

export interface PaymentRequest {
  quoteId: string;
  currency: string;
  amount: number;
  payer: PaymentPayer;
  referenceId: string;
  description: string;
  redirectUrl: string;
}
