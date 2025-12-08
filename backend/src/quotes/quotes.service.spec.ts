import { Test, TestingModule } from '@nestjs/testing';
import { SupraService } from '@/supra/supra.service';
import { QuotesService } from './quotes.service';

describe('QuotesService', () => {
  let quotesService: QuotesService;
  let supraService: jest.Mocked<SupraService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: SupraService,
          useValue: {
            createExchangeQuote: jest.fn(),
          },
        },
      ],
    }).compile();

    quotesService = module.get<QuotesService>(QuotesService);
    supraService = module.get(SupraService) as jest.Mocked<SupraService>;
  });

  it('should be defined', () => {
    expect(quotesService).toBeDefined();
  });

  describe('quoteOrder', () => {
    const orderTotalUsd = 349.0;
    const supraApiResponse = {
      id: 'quote-123',
      exchangeRate: 3877.7916,
      inverseExchangeRate: 0.0002578787369595,
      exchangeRates: {
        COP: 3877.7916,
        USD: 0.0002578787369595,
      },
      finalAmount: 1036,
      initialCurrency: 'USD',
      finalCurrency: 'COP',
      initialAmount: 34900,
      createdAt: '2025-12-06T00:33:09.332Z',
      expiresAt: '2025-12-06T00:34:09.332Z',
      exchangeConfirmationToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGNoYW5nZVJhdGUiOjM4NzcuNzkxNiwiaW52ZXJzZUV4Y2hhbmdlUmF0ZSI6MC4wMDAyNTc4Nzg3MzY5NTk1LCJleGNoYW5nZVJhdGVzIjp7IkNPUCI6Mzg3Ny43OTE2LCJVU0QiOjAuMDAwMjU3ODc4NzM2OTU5NX0sImZpbmFsQW1vdW50IjoxMDM2LCJpbml0aWFsQ3VycmVuY3kiOiJDT1AiLCJmaW5hbEN1cnJlbmN5IjoiVVNEIiwiaW5pdGlhbEFtb3VudCI6NDAyMDAwMCwiY3JlYXRlZEF0IjoiMjAyNS0xMi0wNlQwMDozMzowOS4zMzJaIiwiZXhwaXJlc0F0IjoiMjAyNS0xMi0wNlQwMDozNDowOS4zMzJaIiwiaWF0IjoxNzY0OTgxMTg5LCJleHAiOjE3NjQ5ODEyNDl9.wou4aT3wabzPnqi0JiehQcRW-_taFrMIIUrVWHC0brw',
      transactionCost: 1000,
    };

    beforeEach(() => {
      supraService.createExchangeQuote.mockResolvedValue(supraApiResponse);
    });

    it('should call SupraService.createExchangeQuote with the correct payload', async () => {
      await quotesService.quoteOrder({
        orderTotal: orderTotalUsd,
        initialCurrency: 'USD',
        finalCurrency: 'COP',
      });

      expect(supraService.createExchangeQuote).toHaveBeenCalledWith({
        initialCurrency: 'USD',
        finalCurrency: 'COP',
        initialAmount: orderTotalUsd, // orderTotal is passed directly
      });
    });

    it('should correctly map the Supra response to the service response', async () => {
      const result = await quotesService.quoteOrder({
        orderTotal: orderTotalUsd,
        initialCurrency: 'USD',
        finalCurrency: 'COP',
      });

      expect(result).toEqual({
        quoteId: 'quote-123',
        initialAmount: 34900,
        finalAmount: 1036,
        initialCurrency: 'USD',
        finalCurrency: 'COP',
        exchangeRate: 3877.7916,
        exchageRate: 3877.7916, // Typo kept for compatibility
        expiresAt: '2025-12-06T00:34:09.332Z',
        transactionCost: 1000,
      });
    });
  });
});
