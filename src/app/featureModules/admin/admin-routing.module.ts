import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Module Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { StoreComponent } from './components/store/store.component';
import { CategoriesComponent } from './components/categories/categories.component';

// Import Guard for authenticating routes
import { AuthGuard } from '../../coreModule/guard/auth.guard';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'products', component: ProductsComponent
          },
          {
            path: 'store', component: StoreComponent
          },
          {
            path: 'categories', component: CategoriesComponent
          },
          {
            path: '',
            children: [
              { path: 'dashboard', component: DashboardComponent },
              { path: '', component: DashboardComponent }
            ]
          }
        ]
    },
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard],
    }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
