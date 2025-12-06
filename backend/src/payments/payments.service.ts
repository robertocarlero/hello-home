import { Injectable } from '@nestjs/common';
import { SupraService } from '@/supra/supra.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentRequest } from '@/supra/common/interfaces/payment';
import { Currency } from '@/supra/common/types/currency';
import { DocumentType } from '@/supra/common/types/document-type';

@Injectable()
export class PaymentsService {
  constructor(private readonly supra: SupraService) {}

  async createPayment(dto: CreatePaymentDto) {
    const payload: PaymentRequest = {
      currency: dto.currency as Currency,
      amount: dto.amount,
      quoteId: dto.quoteId,
      fullName: dto.payer.fullName,
      email: dto.payer.email,
      documentType: dto.payer.documentType as DocumentType,
      document: dto.payer.document,
      cellPhone: dto.payer.cellPhone,
      referenceId: dto.referenceId,
      description: dto.description,
      redirectUrl: dto.redirectUrl,
    };

    const payment = await this.supra.createPayinPayment(payload);

    return payment;
  }

  async getPaymentStatus(id: string) {
    const payment = await this.supra.getPayinPayment(id);
    return {
      id: payment.id,
      status: payment.status,
      raw: payment,
    };
  }
}
