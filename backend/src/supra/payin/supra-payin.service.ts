import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '../base/supra-base.service';
import { PaymentRequest } from '../common/types/payment';

@Injectable()
export class SupraPayinService extends SupraBaseService {
  createPayinPayment(payload: PaymentRequest) {
    return this.request('POST', '/v1/payin/payment', payload);
  }

  getPayinPayment(id: string) {
    return this.request('GET', `/v1/payin/payment/${id}`);
  }
}
