import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { SupraService } from '@/supra/supra.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteOrderResponse } from './interfaces/quote-order-response.interface';

@Injectable()
export class QuotesService {
  private readonly logger = new Logger(QuotesService.name);

  constructor(private readonly supraService: SupraService) {}

  async quoteOrder(
    createQuoteDto: CreateQuoteDto,
  ): Promise<QuoteOrderResponse> {
    try {
      const { orderTotal, initialCurrency, finalCurrency } = createQuoteDto;

      const quote = await this.supraService.createExchangeQuote({
        initialAmount: orderTotal,
        initialCurrency,
        finalCurrency,
      });

      return {
        quoteId: quote.id,
        initialAmount: quote.initialAmount,
        finalAmount: quote.finalAmount,
        initialCurrency: quote.initialCurrency,
        finalCurrency: quote.finalCurrency,
        exchangeRate: quote.exchangeRate,
        exchageRate: quote.exchangeRate, // Typo in interface, keeping for compatibility
        expiresAt: quote.expiresAt,
        transactionCost: quote.transactionCost,
      };
    } catch (error) {
      this.logger.error('Error creating quote:', error);

      if (error.response) {
        // Error from Supra API
        throw new HttpException(
          {
            statusCode: error.response.status || HttpStatus.BAD_REQUEST,
            message: error.response.data?.message || 'Quote creation failed',
            error: error.response.data?.error || 'Bad Request',
            details: error.response.data,
          },
          error.response.status || HttpStatus.BAD_REQUEST,
        );
      }

      // Generic error
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create quote',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
