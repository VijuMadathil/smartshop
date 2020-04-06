import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.scss']
})
export class AddressbookComponent implements OnInit {
  selectedAddress: string;
  addressList: string[] = ['Address1', 'Address2', 'Address3'];

  constructor(
    public dialogRef: MatDialogRef<AddressbookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

}
