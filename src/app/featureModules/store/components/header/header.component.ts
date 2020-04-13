import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../../../coreModule/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cartService/cart-service.service';
import { AddressbookComponent } from '../addressbook/addressbook.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  websiteName = 'SMART SHOPPER';
  user: any;
  defaultUsrImgUrl = 'https://frankemavastgoed.nl/wp-content/uploads/2017/07/user-image.jpg';
  /**
   * Cart products
   */
  public products = [];
  cart$: Observable<any>;
  /**
   * Total products price
   */
  public totalPrice = 0;
  public totalItems = 0;
  constructor(public authService: AuthService, protected cart: CartService, protected zone: NgZone, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.cart.getProducts(this.user);
    this.getCartContents();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.products.map(t => t.productPrice * t.items).reduce((acc, value) => acc + value, 0);
  }

  getCartContents(): void {
    this.cart.products.subscribe(data => {
      const products = JSON.parse(JSON.stringify(data));
      // this.totalPrice = this.cart.totalPrice;
      this.zone.run(() => {
        this.products = products;
      });
      this.totalPrice = this.getTotalCost();
      this.totalItems = this.products.length;
      this.cart.updateProducts();
    });
  }

  /**
   * Increment number of specific product
   * @param productIndex index of product in array
   */
  incItems(product) {
    this.cart.addProduct(product);
  }

  /**
   * Decrement number of specific product
   * @param productIndex index of product in array
   */
  decItems(productIndex) {
    this.cart.removeProduct(this.products[productIndex]);
  }

  /**
   *
   * @param item basketProduct
   */
  removeProduct(item) {
    this.cart.removeAllProductItems(item);
  }

  openAddressBook(): void {
    if (this.dialog.openDialogs.length === 1) {
      return;
    }
    const dialogRef = this.dialog.open(AddressbookComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
