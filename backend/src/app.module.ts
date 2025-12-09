import { Module } from '@nestjs/common';
import { SupraModule } from '@/supra/supra.module';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { CountriesModule } from './countries/countries.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { BalancesModule } from './balances/balances.module';
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
    ProductsModule,
    CountriesModule,
    AuthModule,
    OrdersModule,
    BalancesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
