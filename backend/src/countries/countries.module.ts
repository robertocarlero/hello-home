import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { SupraModule } from '@/supra/supra.module';

import { CountriesService } from './countries.service';

@Module({
  imports: [SupraModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
