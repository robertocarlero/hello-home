import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SupraFlowsService } from '@/supra/flows/supra-flows.service';
import { SupraAuthService } from '@/supra/auth/supra-auth.service';
import { of } from 'rxjs';

describe('SupraFlowsService', () => {
  let service: SupraFlowsService;
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
        SupraFlowsService,
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

    service = module.get<SupraFlowsService>(SupraFlowsService);
    httpService = module.get(HttpService);
    authService = module.get(SupraAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrencyExchangeCountries', () => {
    it('should retrieve currency exchange countries with default parameters', async () => {
      const expectedResult = { data: [], total: 0 };

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.getCurrencyExchangeCountries();

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: '/v1/flows/currencyExchange/countries?page=1&limit=100',
        }),
      );
      expect(result).toEqual(expectedResult);
    });

    it('should retrieve currency exchange countries with custom parameters', async () => {
      const expectedResult = { data: [], total: 0 };

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.getCurrencyExchangeCountries(2, 50);

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: '/v1/flows/currencyExchange/countries?page=2&limit=50',
        }),
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getCurrenciesByCountry', () => {
    it('should retrieve currencies by country code', async () => {
      const countryCode = 'CO';
      const expectedResult = { currencies: ['COP'] };

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.getCurrenciesByCountry(countryCode);

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: `/v1/flows/currencyExchange/currencies/country/${countryCode}`,
        }),
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
