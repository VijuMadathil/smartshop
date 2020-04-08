import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbAbstractionLayerService } from '../../../../coreModule/dal/db-abstraction-layer.service';
import { CartService } from '../../services/cartService/cart-service.service';
import { Product } from './product.modal';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product;
  products$: Observable<Product[]>;

  constructor(private dal: DbAbstractionLayerService, private cart: CartService) {
    this.products$ = this.dal.getProductList();
  }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cart.addToCart(product);
  }

}
