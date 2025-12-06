import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupraModule } from '../src/supra/supra.module';
import { SupraService } from '../src/supra/supra.service';
import configuration from '../src/config/configuration';

describe('SupraService (E2E)', () => {
  let app: INestApplication;
  let supraService: SupraService;
  const currency = 'COP';
  const amount = 10000000;

  jest.setTimeout(30_000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        SupraModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    supraService = app.get(SupraService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should test all SupraService methods in a complete flow', async () => {
    const quote = await supraService.createExchangeQuote({
      initialCurrency: currency,
      finalCurrency: 'USD',
      initialAmount: amount,
    });

    expect(quote).toBeDefined();
    expect(quote.id || quote.quoteId).toBeDefined();

    const quoteId = quote.id ?? quote.quoteId;

    const quoteDetails = await supraService.getExchangeQuote(quoteId);

    expect(quoteDetails).toBeDefined();

    const payment = await supraService.createPayinPayment({
      currency,
      amount,
      referenceId: '421391525870201159952640',
      documentType: 'CC',
      email: 'rsancubenshez50000@mail.com',
      cellPhone: '+575555678987',
      document: '123456789',
      fullName: 'John Doe',
      description: 'Collection Payment',
      redirectUrl: 'https://supra.la',
      quoteId,
    });

    expect(payment).toBeDefined();
    expect(payment.id || payment.paymentId).toBeDefined();

    const paymentId = payment.id ?? payment.paymentId;

    const paymentDetails = await supraService.getPayinPayment(paymentId);

    expect(paymentDetails).toBeDefined();

    const balances = await supraService.getUserBalances();

    expect(balances).toBeDefined();
    expect(Array.isArray(balances)).toBe(true);

    if (balances.length > 0) {
      expect(balances[0]).toHaveProperty('currency');
    }

    const countries = await supraService.getCurrencyExchangeCountries();

    expect(countries).toBeDefined();

    const currencies = await supraService.getCurrenciesByCountry('CO');

    expect(currencies).toBeDefined();
  });
});
