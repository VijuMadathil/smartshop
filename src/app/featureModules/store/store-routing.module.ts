import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Module Components
import { StoreComponent } from './store.component';

// Import Guard for authenticating routes
import { AuthGuard } from '../../coreModule/guard/auth.guard';

const routes: Routes = [{ path: '', component: StoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
