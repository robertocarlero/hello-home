import { Module } from '@nestjs/common';
import { SupraModule } from '@/supra/supra.module';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';
import { PaymentsModule } from './payments/payments.module';
import configuration from '@/config/configuration';

@Module({
  imports: [
    SupraModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    QuotesModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
