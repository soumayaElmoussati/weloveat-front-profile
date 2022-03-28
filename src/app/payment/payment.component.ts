import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from '../shared/services/user.service';
import { AdresseService } from '../shared/services/adresse.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  userId = this.tokenS.getId();
  isConnected: boolean;
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

  slug: string;
  restaurant: any;
  infoUser: any;
  contactForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    address: new FormControl(),
    email: new FormControl(),
    phone_number: new FormControl(),
    postal_code: new FormControl(),
    user_address: new FormControl(),
    delivery_time: new FormControl(),
    online_payment: new FormControl('0', Validators.required),
    address_label: new FormControl(),
  })
  ordersList: any;
  getPaymentList: any;
  deliveryTimesList: any;
  postalCodesList: any;
  ProdImgUrl = environment.productImgUrl;
  cart: any = [];
  userAddressList: any;
  label: string;
  addressList: any;
  type:string;
  constructor(
    private AdresseS: AdresseService,
    private route: ActivatedRoute,
    private cartS: CartService,
    private productS: ProductService,
    private tokenS: TokenService,
    private userS: UserService,
  ) {
    this.isConnected = this.tokenS.getToken();
    this.route.queryParams.subscribe( param => this.type = param.type );
  }

  ngOnInit(): void {
    this.getpostalCodes(),
    this.getDeliveryTime(),
    this.getPayment(),
    this.cart = this.cartS.getCart();
    this.getInfoUser();
    this.getAddress();
    // this.getAddressUser();
     this.contactForm.get('address_label').valueChanges.subscribe(
      data=>this.getAddress()
     )
     this.receptionType = this.cartS.getRecep();
     console.log('recep', this.receptionType);
  }
  addressOfUser(){
   return this.contactForm.get('address_label').value
  }
  // getUserAdress(){
  //   this.AdresseS.getAddressOfUserLabel().subscribe(
  //     data => {
  //       this.userAddressList = data.labels;
  //       console.log('',data);
  //       console.log('salut',this.userAddressList)
  //    },
  //     error => { },
  //     () => {  }
  //   )
  // }
  // getAddressUser(){

  //   this.AdresseS.getAddressUserLabel(this.contactForm.get('address_label').value).subscribe(
  //     data => { 
  //       console.log('addddd',data); 

  //       //this.addressList= data.data
  //      },
  //     error => {},
  //     () => {

  //     }
  //   )

  //   //code
  // }

  // getUserAdress(){

  //   this.AdresseS.addAddressOfUser(data).subscribe(

  //     data => {
  //      // this.addressList = data.data;
  //       console.log('addrrr',data);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )

  // }
  
  
  getAddress() {
    this.AdresseS.getAddressOfUser().subscribe(

      data => {
        this.addressList = data.data;
        console.log('getaddress', data);
      },
      error => {
        console.log(error);
      }
    )

  }


  getInfoUser() {
    this.userS.get(this.userId).subscribe(
      data => {

        console.log('cc', data);
        this.infoUser = data.data;
        console.log('name', this.infoUser);
      },
      error => { },
      () => { }
    )
  }
  getPayment() {
    this.cartS.getPayment().subscribe(
      data => { this.getPaymentList = data.data; console.log(data) }
    )
  }
  getDeliveryTime() {
    this.cartS.getDeliveryTimes().subscribe(
      data => { this.deliveryTimesList = data.data; console.log(data) }
    )
  }
  getpostalCodes() {
    this.cartS.getpostalCodes().subscribe(
      data => { this.postalCodesList = data.data; console.log('codep', data) }
    )
  }
  setOrder() {
    let data = this.contactForm.value;
    data.cart = this.cartS.getCart();
    this.cartS.setOrder(data).subscribe(
      data => { this.ordersList = data.data; console.log('orders', data) }
    )
  }
  finalPrice() {

    return this.cartS.finalPrice();

  }

  onContactFormSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }


}
