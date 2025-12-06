import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '@/supra/base/supra-base.service';
import {
  ExchangeQuote,
  CreateExchangeQuoteResponse,
  GetExchangeQuoteResponse,
} from '@/supra/common/interfaces/exchage-quote';

@Injectable()
export class SupraExchangeService extends SupraBaseService {
  createExchangeQuote(
    payload: ExchangeQuote,
  ): Promise<CreateExchangeQuoteResponse> {
    return this.request('POST', '/v1/exchange/quote', payload);
  }

  getExchangeQuote(id: string): Promise<GetExchangeQuoteResponse> {
    return this.request('GET', `/v1/exchange/quote/${id}`);
  }
}
