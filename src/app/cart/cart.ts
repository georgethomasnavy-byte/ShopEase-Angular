import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Cart as CartService } from '../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {

  private cartService = inject(CartService);

  cartItems: any[] = [];
  total = 0;

  ngOnInit(): void {
    this.loadCart();

    this.cartService.cart$.subscribe(() => {
      this.loadCart();
    });
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
  }

  increaseQuantity(id: number) {
    this.cartService.increaseQuantity(id);
  }

  decreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

}