import { Currency } from '@/supra/common/types/currency';
import type { DocumentType } from '@/supra/common/types/document-type';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export type PaymentResponse = {
  paymentId: string;
  url: string;
  status: PaymentStatus;
  createdAt: string;
};

export interface PaymentRequest {
  currency: Currency;
  amount: number;
  referenceId: string;
  documentType: DocumentType;
  email: string;
  cellPhone: string;
  document: string;
  fullName: string;
  description: string;
  redirectUrl: string;
  quoteId: string;
}
