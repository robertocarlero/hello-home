import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '@/supra/base/supra-base.service';
import { ExchangeQuote } from '@/supra/common/interfaces/exchage-quote';

@Injectable()
export class SupraExchangeService extends SupraBaseService {
  createExchangeQuote(payload: ExchangeQuote) {
    return this.request('POST', '/v1/exchange/quote', payload);
  }

  getExchangeQuote(id: string) {
    return this.request('GET', `/v1/exchange/quote/${id}`);
  }
}
