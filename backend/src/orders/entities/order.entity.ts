export class OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export class Order {
  id: string;
  userId: string;
  paymentId: string;
  items: OrderItem[];
  totalAmount: number;
  tax: number;
  status: 'PENDING' | 'EXPIRED' | 'CREATED' | 'PAID' | 'FAILED';
  createdAt: Date;
  quoteId: string;
  exchangeRate: number;
  transactionCost: number;
  initialAmount: number;
  paymentLink: string;
}
