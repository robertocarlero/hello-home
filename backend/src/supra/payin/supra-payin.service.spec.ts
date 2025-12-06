import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SupraPayinService } from './supra-payin.service';
import { SupraAuthService } from '../auth/supra-auth.service';
import { of } from 'rxjs';

describe('SupraPayinService', () => {
  let service: SupraPayinService;
  let httpService: jest.Mocked<HttpService>;
  let authService: jest.Mocked<SupraAuthService>;

  beforeEach(async () => {
    const mockHttpService = {
      request: jest.fn(),
    };

    const mockAuthService = {
      getToken: jest.fn().mockResolvedValue('mock-token'),
    };

    const mockConfigService = {
      get: jest.fn().mockReturnValue('public'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupraPayinService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: SupraAuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SupraPayinService>(SupraPayinService);
    httpService = module.get(HttpService);
    authService = module.get(SupraAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPayinPayment', () => {
    it('should create a payin payment with correct payload', async () => {
      const payload = {
        currency: 'COP' as const,
        amount: 1000000,
        referenceId: '421391525870201159952640',
        documentType: 'CC' as const,
        email: 'test@example.com',
        cellPhone: '+575555678987',
        document: '123456789',
        fullName: 'John Doe',
        description: 'Collection Payment',
        redirectUrl: 'https://supra.la',
        quoteId: 'quote-123',
      };
      const expectedResult = { id: 'payment-123', ...payload };

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.createPayinPayment(payload);

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: '/v1/payin/payment',
          data: payload,
        }),
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPayinPayment', () => {
    it('should retrieve a payin payment by id', async () => {
      const paymentId = 'payment-123';
      const expectedResult = { id: paymentId, status: 'completed' };

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.getPayinPayment(paymentId);

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: `/v1/payin/payment/${paymentId}`,
        }),
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
