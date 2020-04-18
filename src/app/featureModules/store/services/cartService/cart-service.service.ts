import { Injectable } from '@angular/core';
import { Product } from '../../components/products/product.modal';
import { Subject } from 'rxjs';
import { DbAbstractionLayerService } from '../../../../coreModule/dal/db-abstraction-layer.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * Products subject
   */
  products: Subject<any[]> = new Subject<any[]>();

  // Current products in basket
  productsSnapshot = [];

  // Total price of products
  totalPrice = 0;

  // Total items in basket
  totalItems = 0;
  // User id
  userId: string;

  /**
   * User basket history Rx Subject
   */
  basketHistory: Subject<any>;
  constructor(protected dal: DbAbstractionLayerService) {
    this.basketHistory = this.dal.getBasketHistorySubject();
    this.products.subscribe(products => {
      this.productsSnapshot = products;
      this.totalPrice = 0;
      this.totalPrice = products.reduce((prevValue, currProduct) => {
        return prevValue + currProduct.items * currProduct.productPrice;
      }, 0);
      this.totalItems = products.reduce((prevValue, currProduct) => {
        return prevValue + currProduct.items;
      }, 0);
    });

    // if(sessionFlow.userId === 'guest'){
    //   this.getProducts(sessionFlow.deviceId);
    // }
    this.dal.getAuth().onAuthStateChanged((data) => {
      if (data == null) {
        this.userId = null;
      }
      if (data) {
        this.userId = data.uid;
        console.log(this.getProducts(this.userId));
        this.getProducts(this.userId);
      }
    });
  }

  // getCart1() {
  //   this.userId = JSON.parse(localStorage.getItem('user')).uid;
  //   return this.dal.getCart(this.userId);
  // }

  /**
   * Calls {@link getProducts} with user id if exists, otherwise device id
   */
  updateProducts() {
    if (this.userId) {
      this.getProducts(this.userId);
    }
    // else {
    //     this.getProducts(this.sessionFlow.deviceId);
    // }
  }

  /**
   * Get products from cart database and update on client
   * @param id user id or device id
   */
  getProducts(id) {
    this.dal.getBasketContent(id).then((doc) => {
      if (doc.exists) {
          const cartData = doc.data().cart;
          this.products.next(cartData);
          // return doc.data();
      } else {
          // doc.data() will be undefined in this case
          this.products.next([]);
          console.log('No Cart products');
      }
    }).catch((error) => {
        console.log('Error getting Cart details:', error);
    });
  }

  /**
   * Add product to cart database
   * @param Object product object of product
   */
  addProduct(product) {
    let productExistInBasket = false;
    const newBasket = this.productsSnapshot.map(basketProduct => {
      if (basketProduct.id === product.id) {
        basketProduct.items++;
        productExistInBasket = true;
      }
      return basketProduct;
    });
    if (!productExistInBasket) {
      if (!product.items) {
        product.items = 1;
        this.totalItems++;
      }
      newBasket.push(product);
    }
    this.productsSnapshot = newBasket;
    // console.log(this.products);
    if (this.userId) {
      this.dal.setNewBasket(this.userId, newBasket).subscribe(data => {
        this.getProducts(this.userId);
      });
    }
    this.basketHistory.next({
      action: 'added',
      product
    });
  }

  /**
   * Add product to Cart
   * @param Object product object of product
   */
  addToCart(product: Product) {
    this.addProduct(product);
  }

  /**
   * Remove product from basket
   * @param product product to remove
   */
  removeProduct(product) {
    const newBasket = this.productsSnapshot.reduce((prevArray, basketProduct) => {
      if (basketProduct.productName === product.productName) {
        if (basketProduct.items > 1) {
          basketProduct.items--;
          prevArray.push(basketProduct);
          return prevArray;
        } else {
          return prevArray;
        }
      } else {
        prevArray.push(basketProduct);
        return prevArray;
      }
    }, []);
    if (this.userId) {
      this.dal.setNewBasket(this.userId, newBasket).subscribe(data => {});
      this.getProducts(this.userId);
    }
  }

  /**
   * Remove all items of specific product in basket
   * @param product specific product
   */
  removeAllProductItems(product) {
    const newBasket = this.productsSnapshot.reduce((prevArray, basketProduct) => {
      if (basketProduct.productName === product.productName) {
          return prevArray;
      }
      prevArray.push(basketProduct);
      return prevArray;
    }, []);
    if (this.userId) {
      this.dal.setNewBasket(this.userId, newBasket).subscribe(data => {});
      this.getProducts(this.userId);
    } else {
      console.log('Not logged in');
      // this.dal.setNewBasket(this.sessionFlow.deviceId, newBasket).subscribe(data => {});
      // this.getProducts(this.sessionFlow.deviceId);
    }
  }
}
