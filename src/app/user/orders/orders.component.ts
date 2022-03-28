import { Component, OnInit } from '@angular/core';
import { OrdersUserService } from './../../shared/services/orders-user.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  userId = this.tokenS.getId();
  ordersList : any;
  lastOrdersList : any;
  restaurantImgUrl = environment.restaurantImgUrl;
  currentPage: number = 1;

  constructor(
    private OrderUserS: OrdersUserService,
    private userS: UserService,
    private tokenS: TokenService,
    private translocoS: TranslocoService,
    private router: Router
  ) {
    this.userS.currentLinkParam.next({ parent:1, child:0 });
    this.translocoS.selectTranslate('My orders', null).subscribe(value => this.userS.dataTitle.next(value));
    this.translocoS.selectTranslate('This is where you can see an overview of all your orders').subscribe(value => this.userS.dataSubTitle.next(value));
 
   }


  ngOnInit(): void {
    this.getOrders();
    this.getLastRestos();
  }

  getOrders(){
    this.OrderUserS.getOrdersOfUser().subscribe(
 
      data => {
        this.ordersList = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )

  }


  getLastRestos(){
    this.OrderUserS.getLastRestaurant().subscribe(
 
      data => {
        this.lastOrdersList = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )

  }


}
