import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-delivery-zone',
  templateUrl: './confirmation-delete-delivery-zone.component.html',
  styleUrls: ['./confirmation-delete-delivery-zone.component.scss']
})
export class ConfirmationDeleteDeliveryZoneComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationDeleteDeliveryZoneComponent>,
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
