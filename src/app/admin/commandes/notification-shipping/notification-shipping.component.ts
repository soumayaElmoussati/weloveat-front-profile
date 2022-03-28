import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrdersAdminService } from 'src/app/shared/services/orders-admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-shipping',
  templateUrl: './notification-shipping.component.html',
  styleUrls: ['./notification-shipping.component.scss']
})
export class NotificationShippingComponent implements OnInit {

    confirmForm = new FormGroup({
    delivery_time : new FormControl(''),
  })

  constructor(
    private orderAdminS: OrdersAdminService,
    public dialogRef: MatDialogRef<NotificationShippingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  confirmFormSubmit(){
    if(this.confirmForm.valid) this.dialogRef.close(this.confirmForm.value);
  }

  close(){
    this.dialogRef.close();
  }

}
