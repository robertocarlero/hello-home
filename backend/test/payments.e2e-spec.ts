import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import request from 'supertest';
import { PaymentsModule } from '@/payments/payments.module';
import { SupraService } from '@/supra/supra.service';
import { CreatePaymentDto } from '@/payments/dto/create-payment.dto';

describe('PaymentsController (e2e)', () => {
  let app: INestApplication;
  let supraService: SupraService;

  const mockPaymentResponse = {
    id: 'payment-123',
    status: 'PENDING',
    amount: 1000,
    currency: 'COP',
    referenceId: 'ref-123',
    redirectUrl: 'https://example.com/pay',
  };

  const mockSupraService = {
    createPayinPayment: jest.fn().mockResolvedValue(mockPaymentResponse),
    getPayinPayment: jest.fn().mockResolvedValue(mockPaymentResponse),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PaymentsModule,
        ConfigModule.forRoot({
          load: [() => ({ supra: { baseUrl: 'http://localhost' } })],
          isGlobal: true,
        }),
      ],
    })
      .overrideProvider(SupraService)
      .useValue(mockSupraService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    supraService = moduleFixture.get<SupraService>(SupraService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/payments (POST)', () => {
    const createPaymentDto: CreatePaymentDto = {
      quoteId: 'quote-123',
      currency: 'COP',
      amount: 1000,
      payer: {
        fullName: 'John Doe',
        email: 'john@example.com',
        documentType: 'CC',
        document: '123456789',
        cellPhone: '3001234567',
      },
      referenceId: 'ref-123',
      description: 'Test Payment',
      redirectUrl: 'https://mysite.com/callback',
    };

    return request(app.getHttpServer())
      .post('/payments')
      .send(createPaymentDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(mockPaymentResponse);
        expect(supraService.createPayinPayment).toHaveBeenCalledWith(
          expect.objectContaining({
            quoteId: createPaymentDto.quoteId,
            amount: createPaymentDto.amount,
            currency: createPaymentDto.currency,
          }),
        );
      });
  });

  it('/payments/:id (GET)', () => {
    const paymentId = 'payment-123';

    return request(app.getHttpServer())
      .get(`/payments/${paymentId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          id: mockPaymentResponse.id,
          status: mockPaymentResponse.status,
          raw: mockPaymentResponse,
        });
        expect(supraService.getPayinPayment).toHaveBeenCalledWith(paymentId);
      });
  });
});
