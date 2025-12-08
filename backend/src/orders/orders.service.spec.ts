import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentsService } from '../payments/payments.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let paymentsService: PaymentsService;

  const mockPaymentsService = {
    createPayment: jest.fn().mockResolvedValue({
      id: 'pay-1',
      paymentLink: 'http://payment.link',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const order = await service.create(createOrderDto);
    expect(order).toHaveProperty('id');
    expect(order.status).toBe('PENDING');
    expect(order.userId).toBe('user-1');
    expect(order.paymentId).toBe('pay-1');
    expect(mockPaymentsService.createPayment).toHaveBeenCalled();
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

    const orders = service.findAllByUser('user-1');
    expect(orders.length).toBe(1);
    expect(orders[0].userId).toBe('user-1');

    const otherOrders = service.findAllByUser('user-2');
    expect(otherOrders.length).toBe(0);
  });
});
