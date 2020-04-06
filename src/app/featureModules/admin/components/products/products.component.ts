import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DbAbstractionLayerService } from 'src/app/coreModule/dal/db-abstraction-layer.service';

export interface Product {
    id?: string;
    imageURL: string;
    productName: string;
    productPrice: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  product: Product;
  products$: Observable<Product[]>;
  addProductForm: FormGroup;
  durationInSeconds = 1;

  constructor(fb: FormBuilder, private dbs: DbAbstractionLayerService, private snackBar: MatSnackBar) {
    this.addProductForm = fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      imageURL: ['', [Validators.required]]
    });
    this.products$ = this.dbs.getProductList();
  }

  AddProduct() {
    this.dbs.addProduct(this.addProductForm.value);
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1300,
      data: 'Added the product' + this.addProductForm.value.productName
    });
  }

  deleteProduct(product: Product) {
    this.dbs.deleteProduct(product);
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1300,
      data: 'Deleted the product ' + product.productName
    });
  }
}

/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'app-notification',
  template: `
    <span class="notifcation">
      {{data}}!!!
    </span>
  `,
  styles: [`
    .notifcation {
      color: white;
    }
  `],
})
export class NotificationComponent {
  durationInSeconds = 5;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
