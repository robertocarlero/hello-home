export interface Currency {
  isLocalCurrency: boolean;
  currencyCode: string;
  currencyName: string;
  symbol: string;
  countryCode: string;
}

export interface GetCurrenciesResponse {
  currencies: Currency[];
  countryCode: string;
  flow: string;
}
