import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Products } from './products/products';
import { ProductDetails } from './product-details/product-details';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetails },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout }
];