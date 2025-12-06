import { Currency } from '../types/currency';

export interface Balance {
  currency: Lowercase<Currency>;
  amount: number;
}
