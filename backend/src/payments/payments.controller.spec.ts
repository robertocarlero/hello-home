import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const mockPaymentsService = {
    createPayment: jest.fn(),
    getPaymentStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPayment', () => {
    it('should call service.createPayment with the correct parameters', async () => {
      const dto: CreatePaymentDto = {
        quoteId: 'quote_123',
        amount: 1000,
        currency: 'COP',
        payer: {
          fullName: 'John Doe',
          email: 'john@example.com',
          documentType: 'CC',
          document: '123456789',
          cellPhone: '+573001112233',
        },
        referenceId: 'ref_123',
        description: 'Test Payment',
        redirectUrl: 'http://localhost:3000/callback',
      };

      const expectedResult = {
        id: 'payment_123',
        status: 'CREATED',
        ...dto,
      };

      mockPaymentsService.createPayment.mockResolvedValue(expectedResult);

      const result = await controller.createPayment(dto);

      expect(service.createPayment).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPaymentStatus', () => {
    it('should call service.getPaymentStatus with the correct id', async () => {
      const paymentId = 'payment_123';
      const expectedResult = {
        id: paymentId,
        status: 'COMPLETED',
      };

      mockPaymentsService.getPaymentStatus.mockResolvedValue(expectedResult);

      const result = await controller.getPaymentStatus(paymentId);

      expect(service.getPaymentStatus).toHaveBeenCalledWith(paymentId);
      expect(result).toEqual(expectedResult);
    });
  });
});
