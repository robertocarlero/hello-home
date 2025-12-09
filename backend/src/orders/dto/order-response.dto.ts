export class OrderItemResponseDto {
  name: string;
  quantity: number;
  price: number;
}

export class OrderSummaryDto {
  total: number;
  tax: number;
  currency: string;
  items: OrderItemResponseDto[];
}

export class PaymentDetailsDto {
  status: string;
  paidAmount: number;
  currency: string;
  transactionCost: number;
  exchangeRate: number;
  paymentLink: string;
}

export class OrderResponseDto {
  id: string;
  status: string;
  date: Date;
  summary: OrderSummaryDto;
  payment: PaymentDetailsDto;
}
