import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  websiteName = 'SMART SHOPPER';
  user: any;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.photoURL);
   }

  ngOnInit(): void {
  }

}
