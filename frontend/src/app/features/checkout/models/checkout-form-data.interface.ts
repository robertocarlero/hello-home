export type DocumentType = 'CC' | 'NIT' | 'CE' | 'PA';

export interface CheckoutFormData {
  // Customer Information
  fullName: string;
  email: string;
  cellPhone: string;
  document: string;
  documentType: DocumentType;
}
