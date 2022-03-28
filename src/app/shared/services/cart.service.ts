import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  apiUrl = environment.apiUrl;
 
  totalItems = new BehaviorSubject(null);
  currentTotalItems = this.totalItems.asObservable();

  private cart = {
    items : [],
    coupon: null,
    restaurant: null,
    reception_type:null,
    loyalty_points:null,
    total_to_pay:null,
  };

  constructor(
    private http: HttpClient
  ) {
    
  }


  updateNbItems(){
    let nb: number ;
    this.cart.items.forEach(item => {
      nb += parseInt(item.quantity);
    });   
console.log('nb', nb);

if(!nb) nb=0; 

    this.totalItems.next(nb.toString()); 
  }

  addToCart(item, restaurant){
    this.cart = this.getCart() ;
    this.cart.restaurant = restaurant;
     let index = this.cart.items.findIndex(element => element.product.id == item.product.id );
     if(index<0) {this.cart.items.push(item);}
     else{this.cart.items[index].quantity +=item.quantity; }
     console.log(this.cart);
     this.saveCart();
  }

  saveCart(){
    this.updateNbItems();
    localStorage.setItem('wleCart', JSON.stringify(this.cart));
  }

  
  getCart(){
    if(localStorage.getItem('wleCart')){
      return JSON.parse(localStorage.getItem('wleCart'));
    }
    else{
      return {
        items : [],
        coupon: null,
        restaurant: null,
        reception_type:null,
        loyalty_points:null,
        total_to_pay:null
      };
    }
  }
  
  addRecep(type){
    this.cart = this.getCart();
    this.cart.reception_type = type;
    this.saveCart();
    console.log('this.cart.reception_type', this.cart.reception_type);
  }
  getRecep(){
    this.cart = this.getCart();
    return this.cart.reception_type;
    
  }
  addByOne(index){
    this.cart = this.getCart();
    this.cart.items[index].quantity++;
    this.saveCart();
  }
  reduceByOne(index){
    this.cart = this.getCart();
    if(this.cart.items[index].quantity>1){
    this.cart.items[index].quantity--;}
    else{
      this.cart.items[index].quantity==1;
    }
    this.saveCart();
  }

  deleteItem(index){
    this.cart = this.getCart();
    this.cart.items.splice(index, 1);
    this.saveCart();
  }
  // percentageCodePromo(){
  //   let discount = 0;
  //   this.cart = this.getCart();
  //   discount=
  // }
  totalPrice(){
    let total = 0;
    this.cart = this.getCart();
    this.cart.items.forEach(element => { 
      total += element.price*element.quantity;
    });
    return total
  }
finalPrice(){
  let total = 0;
  this.cart = this.getCart();
  this.cart.items.forEach(element => { 
    total += element.price*element.quantity;
  });
  if(this.cart.coupon) total = total -  this.cart.coupon.discount - this.cart.loyalty_points*0.25;
  this.cart.total_to_pay=total;
  this.saveCart()
  return total

}
// nbLoyaltyPoint(){
//   let nb: number ;
//   this.cart = this.getCart();

  
// }
applyCoupon(coupon){
  this.cart = this.getCart();
  this.cart.coupon = coupon;
  this.saveCart()
  console.log(this.cart);
}

applyPoint(points){
  this.cart = this.getCart();
  this.cart.loyalty_points = points;
  this.saveCart()
}

applyLoyaltyPoint(nb){
  this.cart = this.getCart();
  this.cart.loyalty_points = nb;
  this.saveCart()
  console.log(this.cart);
}




getCodePromo(data) :any{
  return this.http.post( this.apiUrl + 'promoCodes/verifyPromoCode', data );
} 

getDeliveryTimes(): any{
  return this.http.get( this.apiUrl + 'deliveryTimes');
}
getpostalCodes(): any{
  return this.http.get( this.apiUrl + 'postalCodes');
}

getPayment():any{
  return this.http.get( this.apiUrl + 'paymentMethods');
}
setOrder(data):any{
  console.log('my data ', data);
  return this.http.post( this.apiUrl + 'orders', data);
}


}
