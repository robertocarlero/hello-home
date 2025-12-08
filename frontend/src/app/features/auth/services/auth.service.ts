import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, of, Observable, map } from 'rxjs';
import { environment } from '@env/environment';

export interface User {
  userId: number;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`;

  currentUser = signal<User | null>(null);

  constructor() {
    this.checkAuth().subscribe();
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.currentUser.set(null);
      this.router.navigate(['/']);
    });
  }

  clearSession(): void {
    this.currentUser.set(null);
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<User>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      tap((user) => this.currentUser.set(user)),
      map(() => true),
      catchError(() => {
        this.currentUser.set(null);
        return of(false);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}
