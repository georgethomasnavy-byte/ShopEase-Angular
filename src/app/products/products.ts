import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Api } from '../services/api';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  private api = inject(Api);
  private cart = inject(Cart);
  private cdr = inject(ChangeDetectorRef);

  products: any[] = [];
  filteredProducts: any[] = [];

  loading = true;

  searchText = '';

  currentCategory = 'smartphones';

  ngOnInit(): void {
    this.loadCategory('smartphones');
  }

  loadCategory(category: string) {

    this.loading = true;
    this.currentCategory = category;

    this.api.getProductsByCategory(category).subscribe({

      next: (response: any) => {

        this.products = response.products;
        this.filteredProducts = response.products;

        this.searchText = '';
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

  searchProducts() {

    const search = this.searchText.toLowerCase().trim();

    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search)
    );

  }

  addToCart(product: any) {

    this.cart.addToCart(product);

    alert(`${product.title} added to cart!`);

  }

}