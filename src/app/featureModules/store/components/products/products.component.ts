import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbAbstractionLayerService } from '../../../../coreModule/dal/db-abstraction-layer.service';

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
  product: Product;
  products$: Observable<Product[]>;

  constructor(private dbs: DbAbstractionLayerService) {
    this.products$ = this.dbs.getProductList();
  }

  ngOnInit(): void {
  }

}
