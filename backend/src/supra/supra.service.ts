import { Injectable } from '@nestjs/common';
import { SupraExchangeService } from '@/supra/exchange/supra-exchange.service';
import { SupraPayinService } from '@/supra/payin/supra-payin.service';
import { SupraPayoutService } from '@/supra/payout/supra-payout.service';
import { SupraFlowsService } from '@/supra/flows/supra-flows.service';
import { ExchangeQuote } from '@/supra/common/interfaces/exchage-quote';
import {
  PaymentRequest,
  CreatePaymentResponse,
  GetPaymentResponse,
} from '@/supra/common/interfaces/payment';

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

  createPayinPayment(payload: PaymentRequest): Promise<CreatePaymentResponse> {
    return this.payin.createPayinPayment(payload);
  }

  getPayinPayment(id: string): Promise<GetPaymentResponse> {
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
