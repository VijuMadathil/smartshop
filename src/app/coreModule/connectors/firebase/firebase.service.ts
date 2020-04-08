import { Injectable } from '@angular/core';
// import * as firebase from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../../../featureModules/store/components/products/product.modal';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basketHistory$: Subject<any> = new Subject();

  private basketHistorySubscription$: Subscription;

  private orderSubject: Subject<any> = new Subject();

  private databaseCollection: AngularFirestoreCollection<any>;

  private auth = AngularFireAuth;

  constructor(private afs: AngularFirestore) { }

  /**
   * Initialize basket history for user. If you want to track basket history run this method when user sign in
   *
   * @param string userId userId or deviceId
   *
   */
  initializeBasketHistory(userId) {
    if (this.basketHistorySubscription$) {
      this.basketHistorySubscription$.unsubscribe();
    }
    this.basketHistorySubscription$ = this.basketHistory$.subscribe( data => {
      this.afs.collection<any>('/basket-history/' + userId).add(data);
    });
  }

  /**
   * Returns basket history subject
   *
   * @returns Subject basketHistory Subject of basketHistory
   */
  getBasketHistorySubject(): Subject<any> {
    return this.basketHistory$;
  }

  /**
   * Returns Rx Observable of basket history of user by userId or deviceId
   *
   * @param string userId  userId or deviceId
   *
   * @returns Observable Rx Observable of basket history
   */
  getBasketHistoryById(userId){
    return this.afs.collection<any>('/basket-history/' + userId).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  /**
   * Set new basket by user id
   * @param id  userId or deviceId
   * @param newBasket newBasket
   *
   * @returns Observable Observable of basket
   */
  setNewBasket(id, newBasket) {
    return Observable.create( observer => {
      this.afs.collection<any>('/basket-history/' + id).add(newBasket).then( data => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  /**
   * Returns basket content of specific user
   *
   * @param string userId user Id
   *
   * @returns Observable Observable of basket
   */
  getBasketContent(userId){
    return this.afs.collection<any>('/basket/' + userId).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
