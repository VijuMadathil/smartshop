import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../../../coreModule/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cartService/cart-service.service';
import { AddressbookComponent } from '../addressbook/addressbook.component';
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

  /**
   * Total products price
   */
  public totalPrice = 0;
  public totalItems = 0;
  constructor(public authService: AuthService, protected cart: CartService, protected zone: NgZone, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCart();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.products.map(t => t.productPrice * t.items).reduce((acc, value) => acc + value, 0);
  }

  getCart(): void {
    this.cart.products.subscribe(data => {
      const products = JSON.parse(JSON.stringify(data));
      this.totalPrice = this.cart.totalPrice;
      this.zone.run(() => {
        this.products = products;
      });
    });
    console.log(this.totalPrice);
    // this.cart.updateProducts();
    console.log(this.cart.productsSnapshot);
    this.products = this.cart.productsSnapshot;
    this.totalPrice = this.cart.totalPrice;
    this.totalItems = this.products.length;
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
