import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentsService } from '../payments/payments.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockPaymentsService = {
    createPayment: jest.fn().mockResolvedValue({
      id: 'pay-1',
      paymentLink: 'http://payment.link',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'user-1',
      quoteId: 'quote-1',
      payer: {
        fullName: 'John Doe',
        email: 'john@example.com',
        documentType: 'CC',
        document: '123456',
        cellPhone: '1234567890',
      },
      referenceId: 'ref-1',
      description: 'Test Order',
      redirectUrl: 'http://redirect.url',
      items: [],
      totalAmount: 100,
      currency: 'USD',
    };
    const order = await controller.create(createOrderDto);
    expect(order).toHaveProperty('id');
    expect(order.userId).toBe('user-1');
  });

  it('should find pending orders by user', async () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'user-1',
      quoteId: 'quote-1',
      payer: {
        fullName: 'John Doe',
        email: 'john@example.com',
        documentType: 'CC',
        document: '123456',
        cellPhone: '1234567890',
      },
      referenceId: 'ref-1',
      description: 'Test Order',
      redirectUrl: 'http://redirect.url',
      items: [],
      totalAmount: 100,
      currency: 'USD',
    };
    await service.create(createOrderDto);

    const orders = controller.findAllPendingByUser('user-1');
    expect(orders.length).toBe(1);
    expect(orders[0].userId).toBe('user-1');
  });
});
