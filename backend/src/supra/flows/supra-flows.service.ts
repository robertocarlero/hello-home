import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '@/supra/base/supra-base.service';
import { GetCountriesResponse } from '@/supra/common/interfaces/country';
import { GetCurrenciesResponse } from '@/supra/common/interfaces/currency';

@Injectable()
export class SupraFlowsService extends SupraBaseService {
  getCurrencyExchangeCountries(
    page = 1,
    limit = 100,
  ): Promise<GetCountriesResponse> {
    return this.request(
      'GET',
      `/v1/flows/currencyExchange/countries?page=${page}&limit=${limit}`,
    );
  }

  getCurrenciesByCountry(countryCode: string): Promise<GetCurrenciesResponse> {
    return this.request(
      'GET',
      `/v1/flows/currencyExchange/currencies/country/${countryCode}`,
    );
  }
}
