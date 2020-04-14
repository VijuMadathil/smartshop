import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DbAbstractionLayerService } from 'src/app/coreModule/dal/db-abstraction-layer.service';
import { Product } from '../../../store/components/products/product.modal';

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
  selProduct: Product;

  constructor(fb: FormBuilder, private dbs: DbAbstractionLayerService, private snackBar: MatSnackBar) {
    this.addProductForm = fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      offerPrice: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      foodCategory: ['', [Validators.required]],
      imageURL: ['', [Validators.required]]
    });
    this.products$ = this.dbs.getProductList();
  }

  selectProduct(product: Product) {
    this.addProductForm.controls['productName'].setValue(product.productName);
    this.addProductForm.controls['productPrice'].setValue(product.productPrice);
    this.addProductForm.controls['offerPrice'].setValue(product.offerPrice);
    this.addProductForm.controls['foodCategory'].setValue(product.foodCategory);
    this.addProductForm.controls['imageURL'].setValue(product.imageURL);
    this.selProduct = product;
  }

  updateProduct() {
    console.log(this.selProduct);
    this.dbs.updateProduct(this.addProductForm.value, this.selProduct.id);
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1300,
      data: 'Updated the product' + this.addProductForm.value.productName
    });
  }

  AddProduct() {
    this.dbs.addProduct(this.addProductForm.value);
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1300,
      data: 'Added the product ' + this.addProductForm.value.productName
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
