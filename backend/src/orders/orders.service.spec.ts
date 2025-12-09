import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentsService } from '../payments/payments.service';

import { SupraService } from '@/supra/supra.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let paymentsService: PaymentsService;
  let supraService: SupraService;

  const mockPaymentsService = {
    createPayment: jest.fn().mockResolvedValue({
      id: 'pay-1',
      paymentLink: 'http://payment.link',
    }),
    getPaymentById: jest.fn(),
  };

  const mockSupraService = {
    getExchangeQuote: jest.fn().mockResolvedValue({
      id: 'quote-1',
      initialAmount: 100,
      initialCurrency: 'USD',
      finalAmount: 400000,
      finalCurrency: 'COP',
      exchangeRate: 4000,
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
        {
          provide: SupraService,
          useValue: mockSupraService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    paymentsService = module.get<PaymentsService>(PaymentsService);
    supraService = module.get<SupraService>(SupraService);
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
      redirectUrl: 'http://redirect.url',
      items: [],
      totalAmount: 100,
      tax: 19,
      currency: 'USD',
    };

    const order = await service.create(createOrderDto);
    expect(order).toHaveProperty('id');
    expect(order.status).toBe('PENDING');
    expect(order.userId).toBe('user-1');
    expect(order.paymentId).toBe('pay-1');
    expect(mockPaymentsService.createPayment).toHaveBeenCalled();
  });

  it('should find and sync orders by user', async () => {
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

    mockPaymentsService.getPaymentById = jest.fn().mockResolvedValue({
      id: 'pay-1',
      status: 'PAID',
      amount: 400000,
      currency: 'COP',
    });

    const order = await service.findOrderByUser('user-1');
    expect(order).toBeDefined();
    expect(order!.status).toBe('PAID');
    expect(order!.payment).toBeDefined();
    expect(order!.payment!.status).toBe('PAID');
    expect(order!.payment!.paidAmount).toBe(400000); // Mapped from quote
    expect(order!.summary.currency).toBe('COP');

    const otherOrder = await service.findOrderByUser('user-2');
    expect(otherOrder).toBeNull();
  });
});
