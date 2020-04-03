import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatNativeDateModule, MatDatepickerModule,
    MatSnackBarModule, MatIconModule, MatSidenavModule, MatListModule],
  exports: [FormsModule, MatCardModule, MatDialogModule, MatFormFieldModule,
   MatInputModule, CommonModule, MatMenuModule, MatButtonModule, MatToolbarModule,
   MatNativeDateModule, MatDatepickerModule, MatSnackBarModule,
     MatIconModule, MatSidenavModule, MatListModule],
})
export class CustomMaterialModule { }