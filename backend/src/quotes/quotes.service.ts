import { Injectable } from '@nestjs/common';
import { SupraService } from '@/supra/supra.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteOrderResponse } from './interfaces/quote-order-response.interface';

@Injectable()
export class QuotesService {
  constructor(private readonly supraService: SupraService) {}

  async quoteOrder({
    orderTotal,
    initialCurrency,
    finalCurrency,
  }: CreateQuoteDto): Promise<QuoteOrderResponse> {
    const initialAmountCents = Math.round(orderTotal * 100);

    const supraResponse = await this.supraService.createExchangeQuote({
      initialCurrency,
      finalCurrency,
      initialAmount: initialAmountCents,
    });

    return {
      quoteId: supraResponse.id,
      initialAmount: supraResponse.initialAmount,
      initialAmountHuman: supraResponse.initialAmount / 100,
      exchangeRate: supraResponse.exchangeRate,
      expiresAt: supraResponse.expiresAt,
    };
  }
}
