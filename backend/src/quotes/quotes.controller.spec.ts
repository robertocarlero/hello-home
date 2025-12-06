import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

describe('QuotesController', () => {
  let controller: QuotesController;
  let quotesService: jest.Mocked<QuotesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [
        {
          provide: QuotesService,
          useValue: {
            quoteOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuotesController>(QuotesController);
    quotesService = module.get(QuotesService) as jest.Mocked<QuotesService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createQuote', () => {
    it('should call QuotesService.quoteOrder with the correct dto', async () => {
      const dto: CreateQuoteDto = {
        orderTotal: 100,
        initialCurrency: 'USD',
        finalCurrency: 'COP',
      };

      const expectedResult = {
        quoteId: 'quote-123',
        initialAmount: 10000,
        initialAmountHuman: 100,
        exchangeRate: 3800,
        expiresAt: '2025-12-06T00:00:00Z',
      };

      quotesService.quoteOrder.mockResolvedValue(expectedResult);

      const result = await controller.createQuote(dto);

      expect(quotesService.quoteOrder).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
