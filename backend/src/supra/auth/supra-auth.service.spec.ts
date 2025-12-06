import { SupraAuthService } from '@/supra/auth/supra-auth.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';

const mockConfigService = {
  get: jest.fn(),
};

const mockHttpService = {
  post: jest.fn(),
};

const MOCK_TOKEN = 'mock-access-token';
const MOCK_CLIENT_ID = 'mock-client-id';
const MOCK_CLIENT_SECRET = 'mock-client-secret';
const MOCK_API_TYPE = 'mock-api-type';

describe('SupraAuthService', () => {
  let service: SupraAuthService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupraAuthService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SupraAuthService>(SupraAuthService);
    httpService = module.get<HttpService>(HttpService);

    jest.clearAllMocks();

    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'supra.clientId') return MOCK_CLIENT_ID;
      if (key === 'supra.clientSecret') return MOCK_CLIENT_SECRET;
      if (key === 'supra.apiType') return MOCK_API_TYPE;
      return null;
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    const mockAuthResponse: AxiosResponse = {
      data: { token: MOCK_TOKEN },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} as any },
    };

    it('should return a token', async () => {
      mockHttpService.post.mockReturnValue(of(mockAuthResponse));

      const token = await service.getToken();

      expect(token).toBe(MOCK_TOKEN);
      expect(httpService.post).toHaveBeenCalledTimes(1);
      expect(httpService.post).toHaveBeenCalledWith(
        '/v1/auth/token',
        {
          clientId: MOCK_CLIENT_ID,
          clientSecret: MOCK_CLIENT_SECRET,
        },
        {
          headers: {
            'X-API-TYPE': MOCK_API_TYPE,
          },
        },
      );
    });
  });
});
