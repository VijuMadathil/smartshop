import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../coreModule/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressbookComponent } from '../addressbook/addressbook.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  websiteName = 'SMART SHOPPER';
  user: any;
  defaultUsrImgUrl = 'https://frankemavastgoed.nl/wp-content/uploads/2017/07/user-image.jpg';

  constructor(public authService: AuthService, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  openAddressBook(): void {
    if (this.dialog.openDialogs.length === 1) {
      return;
    }
    const dialogRef = this.dialog.open(AddressbookComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
