import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { LoyaltyPointComponent } from '../loyalty-point/loyalty-point.component';
import { UserService } from '../shared/services/user.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { PopUpElementComponent } from '../pop-up-element/pop-up-element.component';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isConnected: boolean;
  loyalty_points: any;
  ProdImgUrl = environment.productImgUrl;
  cart: any = [];
  promo_code: any;
  increment: number = 1;
  promoCode: string;
  receptionType = 1;
  receptions = [{
    id: 1,
    name: 'Livraison'
  },
  {
    id: 2,
    name: 'À Emporter'
  }
  ];
  restaurant: any;
  slug:any;
  type:string='restaurant';
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cartS: CartService,
    private userS: UserService,
    private tokenS: TokenService,
    private productS: ProductService,
  ) {
    this.isConnected = this.tokenS.getToken();
    this.route.queryParams.subscribe( param => this.type = param.type );
  }

  ngOnInit(): void {
    this.getLoyaltyPoints();
    this.cart = this.cartS.getCart();
    console.log('cart: ', this.cart);
    console.log(this.cartS.finalPrice());

    
    
  }
 

  incrementQte(i) {
    this.cartS.addByOne(i);
    this.cart = this.cartS.getCart();
  }
  decrementQte(i) {
    this.cartS.reduceByOne(i);
    this.cart = this.cartS.getCart();

  }
  deleteItem(i) {
    this.cartS.deleteItem(i);
    this.cart = this.cartS.getCart();
  }
  finalPrice() {
    this.cartS.finalPrice();
    this.cart=this.cartS.getCart();
    return this.cartS.finalPrice();   
  }
  totalPrice() {
    this.cartS.totalPrice();
    this.cart=this.cartS.getCart();
    return this.cartS.totalPrice();   
  }
 
  getCodePromo() {
    const data = {
      promo_code: this.promoCode
    };

    this.cartS.getCodePromo(data).subscribe(
      data => {
        if (data) {
          this.cartS.applyCoupon(data.promoCode);
          this.cart = this.cartS.getCart();
          console.log(data);
        }
      }
    )
  }
  openloyatlyPoint() {
    this.dialog.open(LoyaltyPointComponent, {
      data: this.loyalty_points,
      width: '846px',
    });


  }
  getLoyaltyPoints() {
    this.userS.getLoyaltyPoint().subscribe(

      data => {
        this.loyalty_points = data.loyalty_points;
      
        console.log('loy', data);
      },
      error => {
        console.log(error);
      }
    )

  }
  openPopUp(slug) {
    const data = {
      slug : this.slug,
      type : this.type,
    };
    this.productS.getRestaurantDetail(data).subscribe(
      data => {
        let dialogRef =  this.dialog.open(PopUpElementComponent,{
      width: '750px',
      data : data.data ,
      
    });

  }
    )
}
}

