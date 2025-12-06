import { Test, TestingModule } from '@nestjs/testing';
import { SupraService } from '@/supra/supra.service';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let supraService: SupraService;

  const mockSupraService = {
    createPayinPayment: jest.fn(),
    getPayinPayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: SupraService,
          useValue: mockSupraService,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    supraService = module.get<SupraService>(SupraService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPayment', () => {
    it('should create a payment using an existing quote', async () => {
      const quoteId = 'quote_123';
      const amount = 1000;
      const currency = 'COP';
      const payer = {
        fullName: 'John Doe',
        email: 'john@example.com',
        documentType: 'CC',
        document: '123456789',
        cellPhone: '+573001112233',
      };

      const mockPaymentResponse = {
        currency: 'COP',
        amount: 10000000,
        referenceId: '421391525870201159952640',
        documentType: 'CC',
        email: 'rsancubenshez50000@mail.com',
        cellPhone: '+575555678987',
        document: '123456789',
        fullName: 'John Doe',
        description: 'Collection Payment',
        redirectUrl: 'https://supra.la',
        quoteId: '9377396a-973d-418b-a598-52d3dcf58c99',
        userId: '358ed58b-0264-458a-9d64-513eb07b5483',
        payerDocumentId: '123456789',
        payerName: 'John Doe',
        paymentLink:
          'https://stg-payments.supra.la/pay-in/complete-details?payinId=b5130f3d-a266-4665-aa54-5c7a6bec35f9&sign=d3971454cd1add665f8a955f6415faacc5c56089640255b8b9b5512f0d6b0dc1',
        id: 'b5130f3d-a266-4665-aa54-5c7a6bec35f9',
        status: 'CREATED',
      };

      mockSupraService.createPayinPayment.mockResolvedValue(
        mockPaymentResponse,
      );

      const referenceId = 'ref_123';
      const description = 'Test Payment';
      const redirectUrl = 'http://localhost:3000/callback';

      const result = await service.createPayment({
        quoteId,
        amount,
        currency,
        payer,
        referenceId,
        description,
        redirectUrl,
      });

      expect(supraService.createPayinPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          quoteId,
          amount,
          currency,
          ...payer,
          referenceId,
          description,
          redirectUrl,
        }),
      );

      expect(result).toEqual(mockPaymentResponse);
    });
  });

  describe('getPaymentStatus', () => {
    it('should return the payment status from SupraService', async () => {
      const paymentId = 'b5130f3d-a266-4665-aa54-5c7a6bec35f9';
      const mockApiResponse = {
        currency: 'COP',
        amount: 10000000,
        referenceId: '421391525870201159952640',
        documentType: 'CC',
        email: 'rsancubenshez50000@mail.com',
        cellPhone: '+575555678987',
        document: '123456789',
        fullName: 'John Doe',
        description: 'Collection Payment',
        redirectUrl: 'https://supra.la',
        quoteId: '9377396a-973d-418b-a598-52d3dcf58c99',
        userId: '358ed58b-0264-458a-9d64-513eb07b5483',
        payerDocumentId: '123456789',
        payerName: 'John Doe',
        paymentLink:
          'https://stg-payments.supra.la/pay-in/complete-details?payinId=b5130f3d-a266-4665-aa54-5c7a6bec35f9&sign=d3971454cd1add665f8a955f6415faacc5c56089640255b8b9b5512f0d6b0dc1',
        id: paymentId,
        status: 'COMPLETED',
      };

      const expectedServiceResponse = {
        id: paymentId,
        status: 'COMPLETED',
        raw: mockApiResponse,
      };

      mockSupraService.getPayinPayment.mockResolvedValue(mockApiResponse);

      const result = await service.getPaymentStatus(paymentId);

      expect(supraService.getPayinPayment).toHaveBeenCalledWith(paymentId);
      expect(result).toEqual(expectedServiceResponse);
    });
  });
});
