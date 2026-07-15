import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private http = inject(HttpClient);

  private baseUrl = 'https://dummyjson.com/products';

  // Get products by category
  getProductsByCategory(category: string) {
    return this.http.get(`${this.baseUrl}/category/${category}`);
  }

  // Smartphones
  getSmartphones() {
    return this.getProductsByCategory('smartphones');
  }

  // Mobile Accessories
  getAccessories() {
    return this.getProductsByCategory('mobile-accessories');
  }

  // Product Details
  getProduct(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}