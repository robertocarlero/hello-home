import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('')
  getCountries(@Query('page') page: number, @Query('limit') limit: number) {
    return this.countriesService.findAll(page, limit);
  }

  @Get(':countryCode/currencies')
  getCurrencies(@Param('countryCode') countryCode: string) {
    return this.countriesService.findCurrenciesByCountry(countryCode);
  }
}
