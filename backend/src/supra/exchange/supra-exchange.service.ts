import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '../base/supra-base.service';
import { ExchangeQuote } from '../common/interfaces/exchage-quote';

@Injectable()
export class SupraExchangeService extends SupraBaseService {
  createExchangeQuote(payload: ExchangeQuote) {
    return this.request('POST', '/v1/exchange/quote', payload);
  }

  getExchangeQuote(id: string) {
    return this.request('GET', `/v1/exchange/quote/${id}`);
  }
}
