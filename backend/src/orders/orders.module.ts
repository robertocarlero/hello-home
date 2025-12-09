import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PaymentsModule } from '../payments/payments.module';
import { SupraModule } from '@/supra/supra.module';

@Module({
  imports: [PaymentsModule, SupraModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
