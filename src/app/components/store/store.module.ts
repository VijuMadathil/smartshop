import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { CarousalComponent } from './components/carousal/carousal.component';
import { HeaderComponent } from './components/header/header.component';

// Angular Material Modules
import { CustomMaterialModule } from './material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
// Flex Layout Module
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCarouselSlideComponent,
  Orientation
} from '@ngmodule/material-carousel';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactInfoBarComponent } from './components/contact-info-bar/contact-info-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { AddressbookComponent } from './components/addressbook/addressbook.component';

// Flex Layout Module
// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [StoreComponent, CarousalComponent, HeaderComponent, ProductsComponent, 
    CartComponent, ContactInfoBarComponent, SearchBarComponent, AddressbookComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    CustomMaterialModule,
    // FlexLayoutModule,
    MatCarouselModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService]
})
export class StoreModule { }
