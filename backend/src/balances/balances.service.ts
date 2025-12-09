import { Injectable } from '@nestjs/common';
import { SupraService } from '@/supra/supra.service';

@Injectable()
export class BalancesService {
  constructor(private readonly supraService: SupraService) {}

  async getBalances() {
    return this.supraService.getUserBalances();
  }
}
