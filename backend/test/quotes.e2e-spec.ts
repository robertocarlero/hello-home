import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { QuotesModule } from '@/quotes/quotes.module';
import { SupraService } from '@/supra/supra.service';
import { CreateQuoteDto } from '@/quotes/dto/create-quote.dto';

describe('QuotesController (e2e)', () => {
  let app: INestApplication;
  let supraService: SupraService;

  const mockSupraResponse = {
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
    exchangeConfirmationToken: 'token',
    transactionCost: 1000,
  };

  const mockSupraService = {
    createExchangeQuote: jest.fn().mockResolvedValue(mockSupraResponse),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuotesModule],
    })
      .overrideProvider(SupraService)
      .useValue(mockSupraService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    supraService = moduleFixture.get<SupraService>(SupraService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/quotes (POST)', () => {
    const createQuoteDto: CreateQuoteDto = {
      orderTotal: 349.0,
      initialCurrency: 'USD',
      finalCurrency: 'COP',
    };

    return request(app.getHttpServer())
      .post('/quotes')
      .send(createQuoteDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          quoteId: 'quote-123',
          initialAmount: 34900,
          initialAmountHuman: 349.0,
          exchangeRate: 3877.7916,
          expiresAt: '2025-12-06T00:34:09.332Z',
        });
      });
  });
});
