import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.quoteOrder(createQuoteDto);
  }
}
