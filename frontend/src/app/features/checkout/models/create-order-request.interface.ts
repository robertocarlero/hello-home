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
  redirectUrl: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  tax: number;
  currency: string;
  exchangeRate: number;
  transactionCost: number;
  initialAmount: number;
}
