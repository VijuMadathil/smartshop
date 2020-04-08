import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../featureModules/store/components/products/product.modal';
// Importing Firebase connector
import { FirebaseService } from '../connectors/firebase/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DbAbstractionLayerService {
  product: Product;
  productsCollectionRef: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;
  constructor(private afs: AngularFirestore, private connector: FirebaseService) {
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

  /**
   * Returns basket content of specific user
   * 
   * @param {string} userId user Id
   * 
   * @returns {Observable} Observable of basket
   */
  getBasketContent(id){
    return this.connector.getBasketContent(id);
  }

  /**
   * Initialize basket history for user. If you want to track basket history run this method when user sign in
   *
   * @param string userId userId or deviceId
   *
   */
  initializeBasketHistory(userId) {
    return this.connector.initializeBasketHistory(userId);
  }

  /**
   * Returns basket history subject
   *
   * @returns Subject basketHistory Subject of basketHistory
   */
  getBasketHistorySubject(): Subject<any> {
    return this.connector.getBasketHistorySubject();
  }

  /**
   * Returns Rx Observable of basket history of user by userId
   *
   * @param string userId  userId
   *
   * @returns Observable Rx Observable of basket history
   */
  getBasketHistoryById(id) {
    return this.connector.getBasketHistoryById(id);
  }

  /**
   * Set new basket by user id or device id
   * @param id  userId or deviceId
   * @param newBasket
   */
  setNewBasket(id, newBasket) {
    return this.connector.setNewBasket(id, newBasket);
  }
}
