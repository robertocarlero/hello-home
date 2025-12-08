import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'user-1',
      paymentId: 'pay-1',
      items: [],
      totalAmount: 100,
      currency: 'USD',
    };

    const order = service.create(createOrderDto);
    expect(order).toHaveProperty('id');
    expect(order.status).toBe('PENDING');
    expect(order.userId).toBe('user-1');
  });

  it('should find pending orders by user', () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'user-1',
      paymentId: 'pay-1',
      items: [],
      totalAmount: 100,
      currency: 'USD',
    };
    service.create(createOrderDto);

    const orders = service.findAllByUser('user-1');
    expect(orders.length).toBe(1);
    expect(orders[0].userId).toBe('user-1');

    const otherOrders = service.findAllByUser('user-2');
    expect(otherOrders.length).toBe(0);
  });
});
