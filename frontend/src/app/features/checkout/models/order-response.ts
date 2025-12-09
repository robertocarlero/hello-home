export interface OrderItemResponse {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderSummary {
  total: number;
  tax: number;
  currency: string;
  items: OrderItemResponse[];
}

export interface PaymentDetails {
  status: string;
  paidAmount: number;
  currency: string;
  transactionCost: number;
  exchangeRate: number;
  paymentLink: string;
}

export interface OrderResponse {
  id: string;
  status: string;
  date: Date;
  summary: OrderSummary;
  payment: PaymentDetails;
}
