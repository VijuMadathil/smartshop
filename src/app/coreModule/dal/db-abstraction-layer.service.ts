import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Importing Firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Product {
  id?: string;
  imageURL: string;
  productName: string;
  productPrice: number;
}
@Injectable({
  providedIn: 'root'
})
export class DbAbstractionLayerService {
  product: Product;
  productsCollectionRef: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;
  constructor(private afs: AngularFirestore) {
    this.productsCollectionRef = this.afs.collection<Product>('products');
   }

  getProductList() {
    return this.productsCollectionRef.snapshotChanges().pipe(
            map(actions => {
              return actions.map(action => {
                const data = action.payload.doc.data() as Product;
                const id = action.payload.doc.id;
                return { id, ...data };
              });
            })
          );
  }
  addProduct(product: Product) {
    this.productsCollectionRef.add(product);
  }
  deleteProduct(product: Product) {
    this.productsCollectionRef.doc(product.id).delete();
  }
}
