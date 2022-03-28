import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersAdminService } from 'src/app/shared/services/orders-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationShippingComponent } from 'src/app/admin/commandes/notification-shipping/notification-shipping.component';
import { environment } from 'src/environments/environment';
import { CloturerOrderComponent } from '../cloturer-order/cloturer-order.component';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.scss']
})
export class DetailCommandeComponent implements OnInit {

  ProdImgUrl = environment.productImgUrl;
  orderDetail:any;
  orderId:any;
  changingStatus = false;
  

  constructor(
    private orderAdminS: OrdersAdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.route.paramMap.subscribe(
      params => this.orderId = params.get('id')
    )
  }

  ngOnInit(): void {
    this.getOrderDetails();
  }



  getOrderDetails(){
    this.orderAdminS.getDetailsOrder(this.orderId).subscribe(
      data => { 
        this.orderDetail = data.data;
        console.log(data);
       },
      error => {},
      () => {}
    )
  }

  onChangeOrderStatus(event){
    this.changingStatus = true;
    if(event == "confirm"){
      this.orderAdminS.confirmeOrder(this.orderDetail.id, null).subscribe(
        data => { this.getOrderDetails() },
        error => {},
        () => { this.changingStatus = false }
        )
    }
    else if(event =="send_notif"){
      const dialog = this.dialog.open( NotificationShippingComponent , {
        data: this.orderDetail.delivery_time,       
        width: '520px',
        height: 'auto',
        disableClose: true
      });

      dialog.afterClosed().subscribe(data => {

        if(data)
        this.orderAdminS.sendNotificationShipping(this.orderDetail.id, data).subscribe(
          data => { this.getOrderDetails() },
          error => {},
          () => { this.changingStatus = false }
        )
      })
    }

    else if(event =="close_ordre"){
      const dialog = this.dialog.open( CloturerOrderComponent , {
        data: this.orderDetail.delivery_time,
        width: '520px',
        height: 'auto',
        disableClose: true
      });

      dialog.afterClosed().subscribe(data => {

        if(data)
        this.orderAdminS.closeOrder(this.orderDetail.id, null).subscribe(
          data => { this.getOrderDetails() },
          error => {},
          () => { this.changingStatus = false }
        )
      })


    }


  }


}
