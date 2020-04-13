import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../featureModules/store/components/products/product.modal';
// Importing Firebase connector
import { FirebaseService } from '../connectors/firebase/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DbAbstractionLayerService {
  product: Product;
  productsCollectionRef: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;
  constructor(protected zone: NgZone, private afs: AngularFirestore, public authService: AuthService, private connector: FirebaseService) {
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

  getCart(userId) {
    // return this.afs.collection<any>('basket').doc(userId).get().then(function(doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     console.log("No such document!");
    //   }
    // })
    console.log(this.afs.collection<any>('basket').doc(userId));
    this.afs.collection<any>('basket').doc(userId).valueChanges().pipe( map (action =>
      {
        console.log(action);
      })
    );
    // this.afs.collection<any>('basket').doc(userId).get().pipe( action =>
    //   console.log(action);
    // );
    // this.afs.collection<any>('basket').doc(userId).get().then(function(doc) {
    //   if (doc.exists) {
    //       console.log("Document data:", doc.data());
    //   } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //   }
    // })

    return this.afs.collection<any>('basket').snapshotChanges().pipe(
      map(actions => {
        console.log(actions);
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          console.log({ id, ...data });
          return { id, ...data };
        });
      })
    );
  }

  addProduct(product: Product) {
    this.connector.addProduct(product);
  }
  deleteProduct(product: Product) {
    this.productsCollectionRef.doc(product.id).delete();
  }

  /**
   * Returns basket content of specific user
   *
   * @param string userId user Id
   *
   * @returns Observable Observable of basket
   */
  getBasketContent(id) {
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
   * @param newBasket newBasket
   */
  setNewBasket(id, newBasket) {
    return this.connector.setNewBasket(id, newBasket);
  }

  /**
   * Returns User subject
   *
   * @returns User Information
   */
  getAuth() {
    return this.authService.getAuth();
  }
}
