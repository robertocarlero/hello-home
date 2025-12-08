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
  currency: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  createdAt: Date;
}
