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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, MatToolbarModule,
    MatNativeDateModule, MatDatepickerModule, MatBadgeModule, MatTableModule, MatDividerModule,
    MatSnackBarModule, MatIconModule, MatSidenavModule, MatListModule, MatAutocompleteModule, MatRadioModule],
  exports: [FormsModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatRadioModule,
   MatInputModule, CommonModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatTableModule,
   MatNativeDateModule, MatDatepickerModule, MatSnackBarModule, MatAutocompleteModule, MatDividerModule,
     MatIconModule, MatSidenavModule, MatListModule, MatBadgeModule],
})
export class CustomMaterialModule { }
