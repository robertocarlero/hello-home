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

      if (error.response) {
        // Error from Supra API
        throw new HttpException(
          {
            statusCode: error.response.status || HttpStatus.BAD_REQUEST,
            message: error.response.data?.message || 'Payment creation failed',
            error: error.response.data?.error || 'Bad Request',
            details: error.response.data,
          },
          error.response.status || HttpStatus.BAD_REQUEST,
        );
      }

      // Generic error
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create payment',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPaymentStatus(id: string) {
    try {
      const payment = await this.supra.getPayinPayment(id);
      return {
        id: payment.id,
        status: payment.status,
        raw: payment,
      };
    } catch (error) {
      this.logger.error(`Error getting payment status for ${id}:`, error);

      if (error.response) {
        throw new HttpException(
          {
            statusCode: error.response.status || HttpStatus.NOT_FOUND,
            message: error.response.data?.message || 'Payment not found',
            error: error.response.data?.error || 'Not Found',
          },
          error.response.status || HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to get payment status',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
