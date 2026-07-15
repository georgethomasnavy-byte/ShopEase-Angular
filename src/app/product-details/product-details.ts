import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Api } from '../services/api';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {

  private api = inject(Api);
  private cart = inject(Cart);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  product: any = {};
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.api.getProduct(id).subscribe({
      next: (response: any) => {
        this.product = response;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart() {
    this.cart.addToCart(this.product);
    alert(`${this.product.title} added to cart!`);
  }

}