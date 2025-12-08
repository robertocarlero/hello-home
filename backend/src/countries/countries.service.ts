import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SupraService } from '@/supra/supra.service';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(private readonly supraService: SupraService) {}

  async findAll(page = 1, limit = 100) {
    try {
      const response = await this.supraService.getCurrencyExchangeCountries(
        page,
        limit,
      );
      return response.countries || [];
    } catch (error) {
      this.logger.error('Error fetching countries', error);
      throw new InternalServerErrorException('Failed to fetch countries');
    }
  }

  async findCurrenciesByCountry(countryCode: string) {
    try {
      const response =
        await this.supraService.getCurrenciesByCountry(countryCode);
      return response.currencies || [];
    } catch (error) {
      this.logger.error(
        `Error fetching currencies for country ${countryCode}`,
        error,
      );
      throw new InternalServerErrorException(
        `Failed to fetch currencies for ${countryCode}`,
      );
    }
  }
}
