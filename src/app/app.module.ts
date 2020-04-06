import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// Auth service
import { AuthService } from './coreModule/services/auth.service';

import { AppRoutingModule } from './coreModule/routing/app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './featureModules/dashboard/dashboard.component';
import { SignInComponent } from './sharedModule/components/sign-in/sign-in.component';
import { SignUpComponent } from './sharedModule/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './sharedModule/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './sharedModule/components/verify-email/verify-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// shared Components
import { FooterComponent } from './sharedModule/components/footer/footer.component';
import { HeaderComponent } from './sharedModule/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
