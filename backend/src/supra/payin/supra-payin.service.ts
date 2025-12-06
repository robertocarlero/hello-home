import { Injectable } from '@nestjs/common';
import { SupraBaseService } from '@/supra/base/supra-base.service';
import {
  PaymentRequest,
  CreatePaymentResponse,
  GetPaymentResponse,
} from '@/supra/common/interfaces/payment';

@Injectable()
export class SupraPayinService extends SupraBaseService {
  createPayinPayment(payload: PaymentRequest): Promise<CreatePaymentResponse> {
    return this.request('POST', '/v1/payin/payment', payload);
  }

  getPayinPayment(id: string): Promise<GetPaymentResponse> {
    return this.request('GET', `/v1/payin/payment/${id}`);
  }
}
