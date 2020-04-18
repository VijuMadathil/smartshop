import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  template: `
    <span class="notifcation">
      {{data}}!!!
    </span>
  `,
  styles: [`
    .notifcation {
      color: white;
    }
  `],
})
export class NotificationComponent {

  durationInSeconds = 5;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
