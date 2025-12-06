import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '@/supra/base/supra-base.service';
import { Balance } from '@/supra/common/interfaces/balance';

@Injectable()
export class SupraPayoutService extends SupraBaseService {
  getUserBalances() {
    return this.request<Balance[]>('GET', '/v1/payout/user/balances');
  }
}
