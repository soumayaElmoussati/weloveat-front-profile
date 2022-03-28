import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cloturer-order',
  templateUrl: './cloturer-order.component.html',
  styleUrls: ['./cloturer-order.component.scss']
})
export class CloturerOrderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CloturerOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onConfirm(){
    this.dialogRef.close({
      confirm: true,
    });
  }

  onCancel(){
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
  
}
