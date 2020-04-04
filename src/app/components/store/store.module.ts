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

// Flex Layout Module
// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [StoreComponent, CarousalComponent, HeaderComponent, ProductsComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    CustomMaterialModule,
    // FlexLayoutModule,
    MatCarouselModule,
    FlexLayoutModule
  ]
})
export class StoreModule { }
