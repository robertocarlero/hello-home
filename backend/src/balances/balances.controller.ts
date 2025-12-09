import { Controller, Get, UseGuards } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';

@Controller('balances')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  @Roles('admin')
  async getBalances() {
    return this.balancesService.getBalances();
  }
}
