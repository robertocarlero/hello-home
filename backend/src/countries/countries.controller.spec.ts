import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;

  const mockCountries = [
    { countryCode: 'CO', countryName: 'Colombia' },
    { countryCode: 'US', countryName: 'Estados Unidos' },
    { countryCode: 'AR', countryName: 'Argentina' },
  ];

  const mockCurrencies = [
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
  ];

  const mockCountriesService = {
    findAll: jest.fn(),
    findCurrenciesByCountry: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: mockCountriesService,
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCountries', () => {
    it('should call service.findAll with default parameters', async () => {
      mockCountriesService.findAll.mockResolvedValue(mockCountries);

      const result = await controller.getCountries(1, 100);

      expect(service.findAll).toHaveBeenCalledWith(1, 100);
      expect(result).toEqual(mockCountries);
    });

    it('should call service.findAll with custom page and limit', async () => {
      mockCountriesService.findAll.mockResolvedValue(mockCountries);

      const page = 2;
      const limit = 50;
      const result = await controller.getCountries(page, limit);

      expect(service.findAll).toHaveBeenCalledWith(page, limit);
      expect(result).toEqual(mockCountries);
    });

    it('should return the result from service', async () => {
      const expectedResult = [mockCountries[0]];
      mockCountriesService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getCountries(1, 1);

      expect(result).toEqual(expectedResult);
    });

    it('should return empty array when service returns empty array', async () => {
      mockCountriesService.findAll.mockResolvedValue([]);

      const result = await controller.getCountries(1, 100);

      expect(result).toEqual([]);
    });
  });

  describe('getCurrencies', () => {
    const countryCode = 'CO';

    it('should call service.findCurrenciesByCountry with the correct country code', async () => {
      mockCountriesService.findCurrenciesByCountry.mockResolvedValue(
        mockCurrencies,
      );

      const result = await controller.getCurrencies(countryCode);

      expect(service.findCurrenciesByCountry).toHaveBeenCalledWith(countryCode);
      expect(result).toEqual(mockCurrencies);
    });

    it('should return the result from service', async () => {
      const expectedResult = [mockCurrencies[0]];
      mockCountriesService.findCurrenciesByCountry.mockResolvedValue(
        expectedResult,
      );

      const result = await controller.getCurrencies(countryCode);

      expect(result).toEqual(expectedResult);
    });

    it('should return empty array when service returns empty array', async () => {
      mockCountriesService.findCurrenciesByCountry.mockResolvedValue([]);

      const result = await controller.getCurrencies(countryCode);

      expect(result).toEqual([]);
    });

    it('should work with different country codes', async () => {
      const testCases = ['US', 'AR', 'BR', 'MX'];

      for (const code of testCases) {
        mockCountriesService.findCurrenciesByCountry.mockResolvedValue(
          mockCurrencies,
        );

        await controller.getCurrencies(code);

        expect(service.findCurrenciesByCountry).toHaveBeenCalledWith(code);
      }
    });
  });
});
