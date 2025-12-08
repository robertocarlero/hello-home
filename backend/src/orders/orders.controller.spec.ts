import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'user-1',
      paymentId: 'pay-1',
      items: [],
      totalAmount: 100,
      currency: 'USD',
    };
    const order = controller.create(createOrderDto);
    expect(order).toHaveProperty('id');
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

    const orders = controller.findAllPendingByUser('user-1');
    expect(orders.length).toBe(1);
    expect(orders[0].userId).toBe('user-1');
  });
});
