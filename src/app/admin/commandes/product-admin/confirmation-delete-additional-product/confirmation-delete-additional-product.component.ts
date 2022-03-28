import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-additional-product',
  templateUrl: './confirmation-delete-additional-product.component.html',
  styleUrls: ['./confirmation-delete-additional-product.component.scss']
})
export class ConfirmationDeleteAdditionalProductComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationDeleteAdditionalProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
