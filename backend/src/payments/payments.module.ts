import { Module } from '@nestjs/common';
import { SupraModule } from '@/supra/supra.module';
import { PaymentsService } from './payments.service';

@Module({
  imports: [SupraModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
