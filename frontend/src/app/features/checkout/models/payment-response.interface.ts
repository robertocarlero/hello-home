import { DocumentType } from './checkout-form-data.interface';
import { PaymentStatus } from './paymen-status.type';

export interface PaymentResponse {
  currency: string;
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
  userId: string;
  payerDocumentId: string;
  payerName: string;
  paymentLink: string;
  id: string;
  status: PaymentStatus;
}
