import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { generateUuid } from '../utils/uuid.util';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  create(createOrderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: generateUuid(),
      ...createOrderDto,
      status: 'PENDING',
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
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
