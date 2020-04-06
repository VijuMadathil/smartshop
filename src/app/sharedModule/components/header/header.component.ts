import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  contactNumber = '+ 1235 2355 98';
  email = 'smartshop@email.com';
  deliveryNote = '3-5 Business days delivery & Free Returns';

  constructor() { }

  ngOnInit(): void {
  }

}
