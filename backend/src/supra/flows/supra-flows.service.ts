import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '@/supra/base/supra-base.service';

@Injectable()
export class SupraFlowsService extends SupraBaseService {
  getCurrencyExchangeCountries(page = 1, limit = 100) {
    return this.request(
      'GET',
      `/v1/flows/currencyExchange/countries?page=${page}&limit=${limit}`,
    );
  }

  getCurrenciesByCountry(countryCode: string) {
    return this.request(
      'GET',
      `/v1/flows/currencyExchange/currencies/country/${countryCode}`,
    );
  }
}
