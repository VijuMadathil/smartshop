import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { CustomMaterialModule } from './material.module';
import { ModalComponent } from './components/modal/modal.component';
import { ProductsComponent } from './components/products/products.component';

// Flex Layout Module
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoriesComponent } from './components/categories/categories.component';
import { StoreComponent } from './components/store/store.component';
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    ModalComponent,
    ProductsComponent,
    CategoriesComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CustomMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModalComponent]
})
export class AdminModule { }
