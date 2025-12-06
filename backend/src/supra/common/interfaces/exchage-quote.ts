export interface ExchangeQuote {
  initialCurrency: string;
  finalCurrency: string;
  initialAmount?: number;
  finalAmount?: number;
}

export interface CreateExchangeQuoteResponse extends ExchangeQuote {
  id: string;
  exchangeRate: number;
  inverseExchangeRate: number;
  exchangeRates: {
    [currency: string]: number;
  };
  finalAmount: number;
  initialAmount: number;
  createdAt: string;
  expiresAt: string;
  exchangeConfirmationToken: string;
  transactionCost: number;
}

export interface GetExchangeQuoteResponse extends CreateExchangeQuoteResponse {
  operationTypeId: string | null;
  tokenType: string;
}
