import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Cart } from '../services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  private cartService = inject(Cart);

  customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  };

  placeOrder() {

    if (
      !this.customer.name ||
      !this.customer.email ||
      !this.customer.phone ||
      !this.customer.address ||
      !this.customer.city ||
      !this.customer.pincode
    ) {
      alert('Please fill in all fields.');
      return;
    }

    alert('🎉 Order placed successfully!');

    this.cartService.clearCart();

    this.customer = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: ''
    };

  }

}