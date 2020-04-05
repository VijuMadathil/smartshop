import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Milk', 'carrot', 'Cabbage'];

  constructor() { }

  ngOnInit(): void {
  }

  

  change(query){
    if(query.length > 0){
      // this.inputSubject.next(query);
    }else{
      // this.products = [];
    }
  }

}
