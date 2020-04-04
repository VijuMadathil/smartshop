import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

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
  productsCollectionRef: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;
  addProductForm: FormGroup;
  durationInSeconds = 1;

  constructor(fb: FormBuilder, private afs: AngularFirestore, private snackBar: MatSnackBar) {
    this.addProductForm = fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required, Validators.min(1), Validators.max(10)],
      imageURL: ['', Validators.required]
    });
    this.productsCollectionRef = this.afs.collection<Product>('products');
    this.products$ = this.productsCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // AddProduct(product: Product) {
  //   this.productsCollectionRef.add({ description: todoDesc, completed: false });
  //   // return this.db.collection('products').add(product);
  // }

  AddProduct() {
    // console.log(this.addProductForm.value);
    this.productsCollectionRef.add(this.addProductForm.value);
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1300,
      data: 'Added the product' + this.addProductForm.value.productName
    });
  }

  deleteProduct(product: Product) {
    this.productsCollectionRef.doc(product.id).delete();
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1300,
      data: 'Deleted the product ' + product.productName
    });
  }

  // openSnackBar() {
  //   this.snackBar.openFromComponent(NotificationComponent, {
  //     data: 'some data'
  //   });
    // openSnackBar(message: string) {
    //   this._snackBar.open(message, action, {
    //     duration: 2000,
    //   });
    // }
  // }
}

/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'app-notification',
  template: `
    <span class="example-pizza-party">
      {{data}}!!!
    </span>
  `,
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class NotificationComponent {
  durationInSeconds = 5;
  msg: 'hi';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
