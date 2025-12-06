import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { Category } from '../models/category.interface';
import { GlobalConfig } from '../config/global.config';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${GlobalConfig.apiUrl}/products`;

  getProducts(category?: string): Observable<Product[]> {
    let url = this.apiUrl;
    if (category) {
      url += `?category=${category}`;
    }
    return this.http.get<Product[]>(url);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
