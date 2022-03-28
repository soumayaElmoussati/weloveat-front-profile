import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-refuse-reservation',
  templateUrl: './confirmation-refuse-reservation.component.html',
  styleUrls: ['./confirmation-refuse-reservation.component.scss']
})
export class ConfirmationRefuseReservationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationRefuseReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }


  onConfirm(){
    this.dialogRef.close({
      confirm: true,
    });
  }

}
