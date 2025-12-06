import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '../base/supra-base.service';
import { Balance } from '../common/interfaces/balance';

@Injectable()
export class SupraPayoutService extends SupraBaseService {
  getUserBalances() {
    return this.request<Balance[]>('GET', '/v1/payout/user/balances');
  }
}
