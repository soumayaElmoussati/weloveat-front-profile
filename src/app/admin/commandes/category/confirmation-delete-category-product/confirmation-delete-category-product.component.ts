import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-category-product',
  templateUrl: './confirmation-delete-category-product.component.html',
  styleUrls: ['./confirmation-delete-category-product.component.scss']
})
export class ConfirmationDeleteCategoryProductComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationDeleteCategoryProductComponent>,
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
