import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { SupraService } from '@/supra/supra.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentRequest } from '@/supra/common/interfaces/payment';
import { Currency } from '@/supra/common/types/currency';
import { DocumentType } from '@/supra/common/types/document-type';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly supra: SupraService) {}

  async createPayment(dto: CreatePaymentDto) {
    try {
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
    } catch (error) {
      this.logger.error('Error creating payment:', error);

      return null;
    }
  }

  async getPaymentById(id: string) {
    try {
      const payment = await this.supra.getPayinPayment(id);
      return payment;
    } catch (error) {
      this.logger.error(`Error getting payment status for ${id}:`, error);
      return null;
    }
  }
}
