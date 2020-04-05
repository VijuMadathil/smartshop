import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss']
})
export class CarousalComponent implements OnInit {
  // slides = ['https://lh3.googleusercontent.com/proxy/KY1Qgvqpw1efd53admwOoCv8JC__Jxmp77vPEbeOikR1ey4v4GwvtCICVt9n46xa8i1Z5STejY3M1Y9kuA9pKYgXpDgE-P8xTRFzd5-63DIHnpiIoYGgJD2zHTC7T5cbl1YoHPD5yejscZ4p9IGfhOC8zYlCrn36GzxlLRIt6ns'];
  // slides = ['a','b','c'];
  slides = [
    {
      image: 'https://lh3.googleusercontent.com/proxy/KY1Qgvqpw1efd53admwOoCv8JC__Jxmp77vPEbeOikR1ey4v4GwvtCICVt9n46xa8i1Z5STejY3M1Y9kuA9pKYgXpDgE-P8xTRFzd5-63DIHnpiIoYGgJD2zHTC7T5cbl1YoHPD5yejscZ4p9IGfhOC8zYlCrn36GzxlLRIt6ns'
    },
    {
      image: 'data:image/jpeg;base64,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'
    },
    {
      image: 'https://c4.wallpaperflare.com/wallpaper/483/91/821/autumn-apples-harvest-grapes-wallpaper-preview.jpg'
    },
    {
      image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/stock%2Fshutterstock_373602469'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}