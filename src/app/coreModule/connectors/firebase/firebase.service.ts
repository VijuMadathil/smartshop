import { Injectable } from '@angular/core';
// import * as firebase from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../../../featureModules/store/components/products/product.modal';
import { Subject, observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basketHistory$: Subject<any> = new Subject();

  private basketHistorySubscription$: Subscription;

  private orderSubject: Subject<any> = new Subject();

  private productCollection: AngularFirestoreCollection<any>;
  private cartCollection: AngularFirestoreCollection<any>;
  private cartHistoryCollection: AngularFirestoreCollection<any>;
  private genCategoryCollection: AngularFirestoreCollection<any>;
  private orderCollection: AngularFirestoreCollection<any>;

  private auth = AngularFireAuth;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.productCollection = this.afs.collection<any>('products');
    this.cartCollection = this.afs.collection<any>('basket');
    this.cartHistoryCollection = this.afs.collection<any>('basket-history');
    this.genCategoryCollection = this.afs.collection<any>('general-category');
    this.orderCollection = this.afs.collection<any>('orders');
   }

  /**
   * Returns basket content of specific user
   *
   * @param string userId user Id
   *
   * @returns Observable Observable of basket
   */
  getBasketContent(userId) {
    const basketRef = this.cartCollection.doc(userId).ref;
    return basketRef.get();
  }

  /**
   * Returns User subject
   *
   * @returns User Information
   */
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  ////////////// After Edits
  /**
   * Add product to database
   *
   * @param Object product product Object
   */
  addProduct(product) {
    this.productCollection.add(product);
  }
  /**
   * Update product to database
   *
   * @param Object product product Object
   */
  updateProduct(product, id) {
    this.productCollection.doc(id).ref.update(product);
  }
  /**
   * Add general category to database
   *
   * @param FormGroup generalCategoryForm form of general category
   */
  addGeneralCategory(generalCategoryForm: FormGroup){
    this.genCategoryCollection.add(generalCategoryForm.value);
  }
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
      this.cartHistoryCollection.doc(userId).set(data);
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
  getBasketHistoryById(userId): Observable<any> {
    return this.cartHistoryCollection.doc(userId).get();
  }
  /**
   * Set new basket by user id or device id
   * @param id  userId or deviceId
   * @param newBasket newBasket
   *
   * @returns Observable Observable of basket
   */
  setNewBasket(id, newBasket): Observable<any> {
    const basket = {
            cart: newBasket
          };
    return new Observable ( observer => {
      this.cartCollection.doc(id).set(basket).then( data => {
          observer.next(data);
          observer.complete();
        });
    });
  }
  /**
   * Save new order to database
   *
   * @param Object paymentData
   *
   * @returns Observable Observable of orders
   */
  saveOrder(paymentData) {
    return new Observable ( observer => {
      this.orderCollection.add(paymentData).then( data => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}
