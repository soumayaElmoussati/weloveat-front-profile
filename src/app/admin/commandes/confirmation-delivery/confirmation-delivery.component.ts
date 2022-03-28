import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delivery',
  templateUrl: './confirmation-delivery.component.html',
  styleUrls: ['./confirmation-delivery.component.scss']
})
export class ConfirmationDeliveryComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationDeliveryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onCancel(){
    this.dialogRef.close();
  }

  onConfirm(){
    this.dialogRef.close({
      confirm: true,
    });
  }

}
