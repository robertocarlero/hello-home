import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalancesService } from '../../services/balances.service';

@Component({
  selector: 'app-balances',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balances.component.html',
})
export class BalancesComponent {
  private balancesService = inject(BalancesService);
  balances$ = this.balancesService.getBalances();
}
