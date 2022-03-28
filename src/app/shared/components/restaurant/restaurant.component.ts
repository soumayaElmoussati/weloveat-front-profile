import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { OrdersUserService } from 'src/app/shared/services/orders-user.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  type:string = 'restaurant';
  @Input() restaurant;
  restauImgUrl = environment.restaurantImgUrl;


  constructor(
    private OrderUserS: OrdersUserService,
    private userS: UserService,
    private tokenS: TokenService,
    private route: ActivatedRoute
  ) {    this.route.queryParams.subscribe( param => this.type = param.type ) }

  ngOnInit(): void {

  }

  addFavoris(){

       const data = {
         id:   this.restaurant.id,
         type: this.restaurant.type
       }
       this.userS.follow(data).subscribe(
         data => {
           this.restaurant.favorite = data.favorite;
         },
         error => {},
         () => {}
       )  
  }

 

}
