export interface CreateOrderRequest {
  userId: string;
  paymentId: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  currency: string;
}
