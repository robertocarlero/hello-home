import { Currency } from '@/supra/common/types/currency';
import type { DocumentType } from '@/supra/common/types/document-type';
import { PaymentStatus } from '@/supra/common/types/payment';

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

export interface CreatePaymentResponse extends PaymentRequest {
  userId: string;
  payerDocumentId: string;
  payerName: string;
  paymentLink: string;
  id: string;
  status: PaymentStatus;
}

export interface GetPaymentResponse extends CreatePaymentResponse {
  createdAt: string;
}
