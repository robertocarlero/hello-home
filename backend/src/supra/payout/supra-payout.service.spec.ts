import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SupraPayoutService } from './supra-payout.service';
import { SupraAuthService } from '../auth/supra-auth.service';
import { of } from 'rxjs';

describe('SupraPayoutService', () => {
  let service: SupraPayoutService;
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
        SupraPayoutService,
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

    service = module.get<SupraPayoutService>(SupraPayoutService);
    httpService = module.get(HttpService);
    authService = module.get(SupraAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserBalances', () => {
    it('should retrieve user balances', async () => {
      const expectedResult = [
        { currency: 'usd' as const, amount: 1000 },
        { currency: 'cop' as const, amount: 5000000 },
      ];

      httpService.request.mockReturnValue(of({ data: expectedResult } as any));

      const result = await service.getUserBalances();

      expect(authService.getToken).toHaveBeenCalled();
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: '/v1/payout/user/balances',
        }),
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
