import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { CustomMaterialModule } from './material.module';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [ModalComponent]
})
export class AdminModule { }
