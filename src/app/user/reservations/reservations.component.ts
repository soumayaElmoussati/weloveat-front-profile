import { Component, OnInit } from '@angular/core';
import { OrdersUserService } from './../../shared/services/orders-user.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservationsList : any;
  lastOrdersList : any;
  restaurantImgUrl = environment.restaurantImgUrl;
  currentPage: number = 1;

  constructor(
    private OrderUserS: OrdersUserService,
    private tokenS: TokenService,
    private userS: UserService,
    private translocoS: TranslocoService
  ) 
  {
    this.userS.currentLinkParam.next({ parent:2, child:0 });
    this.translocoS.selectTranslate('MY_RESERVATIONS', null).subscribe(value => this.userS.dataTitle.next(value));
    this.translocoS.selectTranslate('This is where you can see an overview of all your bookings').subscribe(value => this.userS.dataSubTitle.next(value));
   }

  ngOnInit(): void {
  //  this.getLastOrders();
    this.getUserRes();
    this.getLastRestos();
  }

  getLastOrders(){
    this.userS.getLastOrder().subscribe(
 
      data => {
        this.lastOrdersList = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )

  }

  getUserRes(){
    this.userS.getReservations().subscribe(
 
      data => {
        this.reservationsList = data.data;
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
