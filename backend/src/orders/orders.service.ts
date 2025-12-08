import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { generateUuid } from '../utils/uuid.util';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  constructor(private readonly paymentsService: PaymentsService) {}

  async create(createOrderDto: CreateOrderDto) {
    const payment = await this.paymentsService.createPayment({
      quoteId: createOrderDto.quoteId,
      currency: createOrderDto.currency,
      amount: createOrderDto.totalAmount,
      payer: createOrderDto.payer,
      referenceId: createOrderDto.referenceId,
      description: createOrderDto.description,
      redirectUrl: createOrderDto.redirectUrl,
    });

    const newOrder: Order = {
      id: generateUuid(),
      paymentId: payment.id,
      userId: createOrderDto.userId,
      items: createOrderDto.items,
      totalAmount: createOrderDto.totalAmount,
      currency: createOrderDto.currency,
      status: 'PENDING',
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return { ...newOrder, paymentLink: payment.paymentLink };
  }

  findAllByUser(userId: string): Order[] {
    return this.orders.filter(
      (order) => order.userId === userId && order.status === 'PENDING',
    );
  }

  getAll(): Order[] {
    return this.orders;
  }
}
