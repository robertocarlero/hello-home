import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Balance } from '../models/balance.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalancesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/balances`;

  getBalances(): Observable<Balance[]> {
    return this.http.get<Balance[]>(this.apiUrl, { withCredentials: true });
  }
}
