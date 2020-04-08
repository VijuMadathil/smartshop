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
        return prevValue + currProduct.items * currProduct.product.price;
      }, 0);
      this.totalItems = products.reduce((prevValue, currProduct) => {
        return prevValue + currProduct.items;
      }, 0);
    });
    // if(sessionFlow.userId === 'guest'){
    //   this.getProducts(sessionFlow.deviceId);
    // }
    // this.dal.getAuth().onAuthStateChanged((data) => {
    //   if(data == null){
    //     this.userId = null;
    //   }
    //   if (data) {
    //     this.userId = data.uid;
    //     this.getProducts(this.userId);
    //   }
    // });
  }

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
   * Get products from database and update on client
   * @param id user id or device id
   */
  getProducts(id) {
    this.dal.getBasketContent(id).subscribe( data => {
      console.log(data);
      // if (!data.exists()) {
      //   this.products.next([]);
      // }
      // if (data.val()) {
      //   const products = Object.keys(data.val()).map((key) => {
      //     const item = data.val()[key];
      //     item['idInBasket'] = key;
      //     return item;
      //   });
      //   let ids = products.map(item => {
      //     return item['id'];
      //   });
      //   let queryObj = {
      //     query: {
      //       ids: {
      //         values: ids
      //       }
      //     }
      //   };
      //   this.dal.getProductsByIds(queryObj).subscribe( data => {
      //     if (data.val()) {
      //       let result = [];
      //       for(let i = 0; i < products.length; i++) {
      //         for(let j = 0; j < data.val().length; j++){
      //           let product = data.val()[j];
      //           if(products[i]['id'] === product['_id']){
      //             products[i]['product'] = product['_source'];
      //             result.push(products[i]);
      //           }
      //         }
      //       }
      //       this.products.next(result);
      //     }
      //   });
      // }
    });
  }

  /**
   * Add product to database
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
    console.log(this.userId);
    // console.log(this.products);
    if (this.userId) {
      this.dal.setNewBasket(this.userId, newBasket).subscribe(data => {
        this.getProducts(this.userId);
      });
    }
  }

  /**
   * Add product to Cart
   * @param Object product object of product
   */
  addToCart(product: Product) {
    this.addProduct(product);
  }
}
