import { Currency } from '@/supra/common/types/currency';

export interface Balance {
  currency: Lowercase<Currency>;
  amount: number;
}
