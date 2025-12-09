import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentsService } from '../payments/payments.service';
import { SupraService } from '@/supra/supra.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockPaymentsService = {
    createPayment: jest.fn().mockResolvedValue({
      id: 'pay-1',
      paymentLink: 'http://payment.link',
    }),
    getPaymentById: jest.fn().mockResolvedValue({ status: 'PENDING' }),
  };

  const mockSupraService = {
    getExchangeQuote: jest.fn().mockResolvedValue({}),
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
        {
          provide: SupraService,
          useValue: mockSupraService,
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
      redirectUrl: 'http://redirect.url',
      items: [],
      totalAmount: 100,
      tax: 19,
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
      redirectUrl: 'http://redirect.url',
      items: [],
      totalAmount: 100,
      tax: 19,
      currency: 'USD',
    };
    await service.create(createOrderDto);

    const order = await controller.findOrderByUser('user-1');
    expect(order).toBeDefined();
    expect(order!.status).toBe('PENDING');
  });
});
