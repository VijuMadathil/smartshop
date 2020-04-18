import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbAbstractionLayerService } from '../../../../coreModule/dal/db-abstraction-layer.service';
import { CartService } from '../../services/cartService/cart-service.service';
import { Product } from './product.modal';
import { NotificationComponent } from '../../../../sharedModule/components/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product;
  products$: Observable<Product[]>;
  durationInSeconds = 1;

  constructor(private dal: DbAbstractionLayerService, private cart: CartService, private snackBar: MatSnackBar) {
    this.products$ = this.dal.getProductList();
  }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cart.addToCart(product);
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1300,
      data: product.productName + ' is added to cart !!!'
    });
  }

}
