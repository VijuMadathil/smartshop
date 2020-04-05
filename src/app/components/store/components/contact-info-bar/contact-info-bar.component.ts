import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info-bar',
  templateUrl: './contact-info-bar.component.html',
  styleUrls: ['./contact-info-bar.component.scss']
})
export class ContactInfoBarComponent implements OnInit {
  contactNumber = '+ 1235 2355 98';
  email = 'smartshop@email.com';
  deliveryNote = '3-5 Business days delivery & Free Returns';

  constructor() { }

  ngOnInit(): void {
  }

}
