import { Test, TestingModule } from '@nestjs/testing';
import { SupraService } from './supra.service';
import { SupraExchangeService } from './exchange/supra-exchange.service';
import { SupraPayinService } from './payin/supra-payin.service';
import { SupraPayoutService } from './payout/supra-payout.service';
import { SupraFlowsService } from './flows/supra-flows.service';

describe('SupraService', () => {
  let service: SupraService;
  let exchangeService: jest.Mocked<SupraExchangeService>;
  let payinService: jest.Mocked<SupraPayinService>;
  let payoutService: jest.Mocked<SupraPayoutService>;
  let flowsService: jest.Mocked<SupraFlowsService>;

  beforeEach(async () => {
    const mockExchangeService = {
      createExchangeQuote: jest.fn(),
      getExchangeQuote: jest.fn(),
    };

    const mockPayinService = {
      createPayinPayment: jest.fn(),
      getPayinPayment: jest.fn(),
    };

    const mockPayoutService = {
      getUserBalances: jest.fn(),
    };

    const mockFlowsService = {
      getCurrencyExchangeCountries: jest.fn(),
      getCurrenciesByCountry: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupraService,
        {
          provide: SupraExchangeService,
          useValue: mockExchangeService,
        },
        {
          provide: SupraPayinService,
          useValue: mockPayinService,
        },
        {
          provide: SupraPayoutService,
          useValue: mockPayoutService,
        },
        {
          provide: SupraFlowsService,
          useValue: mockFlowsService,
        },
      ],
    }).compile();

    service = module.get<SupraService>(SupraService);
    exchangeService = module.get(SupraExchangeService);
    payinService = module.get(SupraPayinService);
    payoutService = module.get(SupraPayoutService);
    flowsService = module.get(SupraFlowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delegate createExchangeQuote to SupraExchangeService', () => {
    const payload = {
      initialCurrency: 'COP',
      finalCurrency: 'USD',
      initialAmount: 1000,
    };
    service.createExchangeQuote(payload);
    expect(exchangeService.createExchangeQuote).toHaveBeenCalledWith(payload);
  });

  it('should delegate getExchangeQuote to SupraExchangeService', () => {
    const id = 'quote-123';
    service.getExchangeQuote(id);
    expect(exchangeService.getExchangeQuote).toHaveBeenCalledWith(id);
  });

  it('should delegate createPayinPayment to SupraPayinService', () => {
    const payload = { currency: 'COP', amount: 1000 } as any;
    service.createPayinPayment(payload);
    expect(payinService.createPayinPayment).toHaveBeenCalledWith(payload);
  });

  it('should delegate getPayinPayment to SupraPayinService', () => {
    const id = 'payment-123';
    service.getPayinPayment(id);
    expect(payinService.getPayinPayment).toHaveBeenCalledWith(id);
  });

  it('should delegate getUserBalances to SupraPayoutService', () => {
    service.getUserBalances();
    expect(payoutService.getUserBalances).toHaveBeenCalled();
  });

  it('should delegate getCurrencyExchangeCountries to SupraFlowsService', () => {
    service.getCurrencyExchangeCountries(1, 100);
    expect(flowsService.getCurrencyExchangeCountries).toHaveBeenCalledWith(
      1,
      100,
    );
  });

  it('should delegate getCurrenciesByCountry to SupraFlowsService', () => {
    const countryCode = 'CO';
    service.getCurrenciesByCountry(countryCode);
    expect(flowsService.getCurrenciesByCountry).toHaveBeenCalledWith(
      countryCode,
    );
  });
});
