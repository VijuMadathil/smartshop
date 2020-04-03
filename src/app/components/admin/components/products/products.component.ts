import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class ProductsComponent implements OnInit {
  private productsCounter = 0;
  private db: any;
  product: Product;
  productsCollectionRef: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;
  addProductForm: FormGroup;
  durationInSeconds = 5;

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
  }

  deleteProduct(product: Product) {
    this.productsCollectionRef.doc(product.id).delete();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
  }

}

/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'app-notification',
  template: `
    <span class="example-pizza-party">
      Product Added!!! 🍕
    </span>
  `,
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class NotificationComponent {
  durationInSeconds = 5;

  constructor() {}
}