import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SupraAuthService {
  private accessToken: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getToken(): Promise<string> {
    const clientId = this.config.get<string>('supra.clientId');
    const clientSecret = this.config.get<string>('supra.clientSecret');
    const apiType = this.config.get<string>('supra.apiType');

    const response$ = this.http.post(
      '/v1/auth/token',
      {
        clientId,
        clientSecret,
      },
      {
        headers: {
          'X-API-TYPE': apiType,
        },
      },
    );

    const { data } = await firstValueFrom(response$);

    this.accessToken = data?.token;

    return this.accessToken;
  }
}
