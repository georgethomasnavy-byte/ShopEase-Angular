import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Cart } from '../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  private cartService = inject(Cart);

  cartCount = 0;

  ngOnInit(): void {
    this.updateCartCount();

    this.cartService.cart$.subscribe(() => {
      this.updateCartCount();
    });
  }

  updateCartCount() {
    this.cartCount = this.cartService
      .getCartItems()
      .reduce((total, item) => total + item.quantity, 0);
  }

}