import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { SupraModule } from '@/supra/supra.module';

@Module({
  imports: [SupraModule],
  controllers: [BalancesController],
  providers: [BalancesService],
})
export class BalancesModule {}
