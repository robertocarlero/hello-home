import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SupraExchangeService } from './supra-exchange.service';
import { SupraAuthService } from '../auth/supra-auth.service';
import { of } from 'rxjs';

describe('SupraExchangeService', () => {
  let service: SupraExchangeService;
  let httpService: jest.Mocked<HttpService>;
  let authService: jest.Mocked<SupraAuthService>;

  beforeEach(async () => {
    const mockHttpService = {
      request: jest.fn(),
    };

    const mockAuthService = {
      getToken: jest.fn().mockResolvedValue('mock-token'),
    };

    const mockConfigService = {
      get: jest.fn().mockReturnValue('public'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupraExchangeService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: SupraAuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SupraExchangeService>(SupraExchangeService);
    httpService = module.get(HttpService);
    authService = module.get(SupraAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createExchangeQuote', () => {
    it('should create an exchange quote with correct payload', async () => {
      const payload = {
        initialCurrency: 'COP',
        finalCurrency: 'USD',
        initialAmount: 4000000,
      };
      const expectedResult = { id: 'quote-123', ...payload };

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.createExchangeQuote(payload);

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: '/v1/exchange/quote',
          data: payload,
        }),
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getExchangeQuote', () => {
    it('should retrieve an exchange quote by id', async () => {
      const quoteId = 'quote-123';
      const expectedResult = { id: quoteId, status: 'active' };

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.getExchangeQuote(quoteId);

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: `/v1/exchange/quote/${quoteId}`,
        }),
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
