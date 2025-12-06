import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupraAuthService } from './auth/supra-auth.service';
import { SupraService } from './supra.service';
import { ConfigService } from '@nestjs/config';
import { SupraExchangeService } from './exchange/supra-exchange.service';
import { SupraPayinService } from './payin/supra-payin.service';
import { SupraPayoutService } from './payout/supra-payout.service';
import { SupraFlowsService } from './flows/supra-flows.service';

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
