import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { generateUuid } from '../utils/uuid.util';
import { PaymentsService } from '../payments/payments.service';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  private orders: Map<string, Order> = new Map();

  constructor(private readonly paymentsService: PaymentsService) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderId = generateUuid();
    const userId = createOrderDto.userId;

    const payment = await this.paymentsService.createPayment({
      quoteId: createOrderDto.quoteId,
      currency: createOrderDto.currency,
      amount: createOrderDto.totalAmount,
      payer: createOrderDto.payer,
      referenceId: orderId,
      description: `Order ${orderId}`,
      redirectUrl: createOrderDto.redirectUrl,
    });

    const newOrder: Order = {
      id: orderId,
      paymentId: payment?.id || '',
      quoteId: createOrderDto.quoteId,
      userId,
      items: createOrderDto.items,
      totalAmount: createOrderDto.totalAmount,
      tax: createOrderDto.tax,
      exchangeRate: createOrderDto.exchangeRate,
      transactionCost: createOrderDto.transactionCost,
      status: 'PENDING',
      createdAt: new Date(),
      initialAmount: createOrderDto.initialAmount,
      paymentLink: payment?.paymentLink || '',
    };
    this.orders.set(userId, newOrder);
    return newOrder;
  }

  async findOrderByUser(userId: string): Promise<OrderResponseDto | null> {
    const order = this.orders.get(userId);
    if (!order) return null;
    try {
      const payment = await this.paymentsService.getPaymentById(
        order.paymentId,
      );
      order.status = payment?.status || 'PENDING';

      const response: OrderResponseDto = {
        date: order.createdAt,
        id: order.id,
        status: order?.status || 'PENDING',
        payment: {
          status: payment?.status || 'PENDING',
          currency: payment?.currency || '',
          paidAmount: payment?.amount || 0,
          paymentLink: order.paymentLink || '',
          exchangeRate: order.exchangeRate || 0,
          transactionCost: order.transactionCost || 0,
        },
        summary: {
          currency: payment?.currency || '',
          total: order.initialAmount,
          tax: order.tax,
          items: order.items,
        },
      };

      this.orders.set(userId, order);

      return response;
    } catch (error) {
      console.error(`Failed to enrich data for order ${order.id}`, error);
      throw new InternalServerErrorException('Failed to fetch countries');
    }
  }

  getAll(): Order[] {
    return Array.from(this.orders.values());
  }
}
