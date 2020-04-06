import { NgModule } from '@angular/core';

// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '../../sharedModule/components/sign-in/sign-in.component';
import { SignUpComponent } from '../../sharedModule/components/sign-up/sign-up.component';
import { DashboardComponent } from '../../featureModules/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../sharedModule/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../sharedModule/components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from '../guard/auth.guard';
import { SecureInnerPagesGuard } from '../guard/secure-inner-pages.guard.ts.guard';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'admin', loadChildren: () => import('../../featureModules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'store', loadChildren: () => import('../../featureModules/store/store.module').then(m => m.StoreModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
