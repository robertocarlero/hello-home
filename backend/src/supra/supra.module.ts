import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupraAuthService } from '@/supra/auth/supra-auth.service';
import { SupraService } from '@/supra/supra.service';
import { ConfigService } from '@nestjs/config';
import { SupraExchangeService } from '@/supra/exchange/supra-exchange.service';
import { SupraPayinService } from '@/supra/payin/supra-payin.service';
import { SupraPayoutService } from '@/supra/payout/supra-payout.service';
import { SupraFlowsService } from '@/supra/flows/supra-flows.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('supra.baseUrl'),
        timeout: 30000,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    SupraAuthService,
    SupraService,
    SupraExchangeService,
    SupraPayinService,
    SupraPayoutService,
    SupraFlowsService,
  ],
})
export class SupraModule {}
