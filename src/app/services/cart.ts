import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  private cartItems: any[] = [];

  private cartSubject = new BehaviorSubject<any[]>([]);

  cart$ = this.cartSubject.asObservable();

  // Add product to cart
  addToCart(product: any) {

    const existingProduct = this.cartItems.find(
      item => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1
      });
    }

    this.cartSubject.next(this.cartItems);

  }

  // Get cart items
  getCartItems() {
    return this.cartItems;
  }

  // Remove item
  removeItem(id: number) {

    this.cartItems = this.cartItems.filter(
      item => item.id !== id
    );

    this.cartSubject.next(this.cartItems);

  }

  // Increase quantity
  increaseQuantity(id: number) {

    const item = this.cartItems.find(
      p => p.id === id
    );

    if (item) {
      item.quantity++;
    }

    this.cartSubject.next(this.cartItems);

  }

  // Decrease quantity
  decreaseQuantity(id: number) {

    const item = this.cartItems.find(
      p => p.id === id
    );

    if (item && item.quantity > 1) {
      item.quantity--;
    }

    this.cartSubject.next(this.cartItems);

  }

  // Total price
  getTotalPrice(): number {

    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  }

  // Clear cart
  clearCart() {

    this.cartItems = [];

    this.cartSubject.next([]);

  }

}