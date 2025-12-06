import { Injectable } from '@nestjs/common';
import { SupraExchangeService } from './exchange/supra-exchange.service';
import { SupraPayinService } from './payin/supra-payin.service';
import { SupraPayoutService } from './payout/supra-payout.service';
import { SupraFlowsService } from './flows/supra-flows.service';
import { ExchangeQuote } from './common/interfaces/exchage-quote';
import { PaymentRequest } from './common/types/payment';

@Injectable()
export class SupraService {
  constructor(
    private readonly exchange: SupraExchangeService,
    private readonly payin: SupraPayinService,
    private readonly payout: SupraPayoutService,
    private readonly flows: SupraFlowsService,
  ) {}

  createExchangeQuote(payload: ExchangeQuote) {
    return this.exchange.createExchangeQuote(payload);
  }

  getExchangeQuote(id: string) {
    return this.exchange.getExchangeQuote(id);
  }

  createPayinPayment(payload: PaymentRequest) {
    return this.payin.createPayinPayment(payload);
  }

  getPayinPayment(id: string) {
    return this.payin.getPayinPayment(id);
  }

  getUserBalances() {
    return this.payout.getUserBalances();
  }

  getCurrencyExchangeCountries(page = 1, limit = 100) {
    return this.flows.getCurrencyExchangeCountries(page, limit);
  }

  getCurrenciesByCountry(countryCode: string) {
    return this.flows.getCurrenciesByCountry(countryCode);
  }
}
