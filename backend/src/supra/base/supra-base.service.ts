import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SupraAuthService } from '../auth/supra-auth.service';

@Injectable()
export abstract class SupraBaseService {
  protected readonly apiType: string;

  constructor(
    protected readonly http: HttpService,
    protected readonly auth: SupraAuthService,
    protected readonly config: ConfigService,
  ) {
    this.apiType = this.config.get<string>('supra.apiType') ?? 'public';
  }

  protected async request<T = any>(
    method: 'GET' | 'POST',
    url: string,
    body?: any,
  ): Promise<T> {
    const token = await this.auth.getToken();

    const response$ = this.http.request<T>({
      method,
      url,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        'X-API-TYPE': this.apiType,
      },
    });

    const { data } = await firstValueFrom(response$);

    return data;
  }
}
