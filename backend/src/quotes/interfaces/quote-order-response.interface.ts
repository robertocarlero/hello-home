export interface QuoteOrderResponse {
  quoteId: string;
  initialCurrency: string;
  finalCurrency: string;
  initialAmount: number;
  finalAmount: number;
  exchangeRate: number;
  expiresAt: string;
  exchageRate: number;
  transactionCost: number;
}
