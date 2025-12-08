export interface Payer {
  fullName: string;
  email: string;
  documentType: string;
  document: string;
  cellPhone: string;
}

export interface CreateOrderRequest {
  userId: string;
  quoteId: string;
  payer: Payer;
  referenceId: string;
  description: string;
  redirectUrl: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  currency: string;
}
