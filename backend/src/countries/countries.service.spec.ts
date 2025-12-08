import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { SupraService } from '@/supra/supra.service';

describe('CountriesService', () => {
  let service: CountriesService;
  let supraService: jest.Mocked<SupraService>;

  const mockCountriesResponse = {
    countries: [
      { countryCode: 'CO', countryName: 'Colombia' },
      { countryCode: 'US', countryName: 'Estados Unidos' },
      { countryCode: 'AR', countryName: 'Argentina' },
    ],
    meta: {
      itemsPerPage: 100,
      totalItems: 295,
      currentPage: 1,
      totalPages: 3,
      sortBy: [['country.countryName', 'ASC']],
    },
    flow: 'currencyExchange',
  };

  const mockCurrenciesResponse = {
    currencies: [
      {
        isLocalCurrency: true,
        currencyCode: 'COP',
        currencyName: 'Pesos Colombianos (COP)',
        symbol: '$',
        countryCode: 'CO',
      },
      {
        isLocalCurrency: false,
        currencyCode: 'USD',
        currencyName: 'Dólares Americanos (USD)',
        symbol: '$',
        countryCode: 'US',
      },
    ],
    countryCode: 'CO',
    flow: 'currencyExchange',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: SupraService,
          useValue: {
            getCurrencyExchangeCountries: jest.fn(),
            getCurrenciesByCountry: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    supraService = module.get(SupraService) as jest.Mocked<SupraService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of countries', async () => {
      supraService.getCurrencyExchangeCountries.mockResolvedValue(
        mockCountriesResponse,
      );

      const result = await service.findAll();

      expect(result).toEqual(mockCountriesResponse.countries);
      expect(supraService.getCurrencyExchangeCountries).toHaveBeenCalledWith(
        1,
        100,
      );
    });

    it('should call SupraService with custom page and limit', async () => {
      supraService.getCurrencyExchangeCountries.mockResolvedValue(
        mockCountriesResponse,
      );

      await service.findAll(2, 50);

      expect(supraService.getCurrencyExchangeCountries).toHaveBeenCalledWith(
        2,
        50,
      );
    });

    it('should return empty array if countries is undefined', async () => {
      supraService.getCurrencyExchangeCountries.mockResolvedValue({
        ...mockCountriesResponse,
        countries: undefined,
      } as any);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findCurrenciesByCountry', () => {
    const countryCode = 'CO';

    it('should return an array of currencies for a country', async () => {
      supraService.getCurrenciesByCountry.mockResolvedValue(
        mockCurrenciesResponse,
      );

      const result = await service.findCurrenciesByCountry(countryCode);

      expect(result).toEqual(mockCurrenciesResponse.currencies);
      expect(supraService.getCurrenciesByCountry).toHaveBeenCalledWith(
        countryCode,
      );
    });

    it('should return empty array if currencies is undefined', async () => {
      supraService.getCurrenciesByCountry.mockResolvedValue({
        ...mockCurrenciesResponse,
        currencies: undefined,
      } as any);

      const result = await service.findCurrenciesByCountry(countryCode);

      expect(result).toEqual([]);
    });
  });
});
