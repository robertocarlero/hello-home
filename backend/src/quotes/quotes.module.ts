import { Module } from '@nestjs/common';
import { SupraModule } from '@/supra/supra.module';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  imports: [SupraModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
