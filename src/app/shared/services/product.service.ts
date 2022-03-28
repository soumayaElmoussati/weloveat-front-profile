import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }


  getCategories(data) :any{
    return this.http.post( this.apiUrl + 'establishments/getEstablishmentPopularCategories', data );
  }

  getPopularCategories(data) :any{
    return this.http.post( this.apiUrl + 'establishments/getEstablishmentPopularCategories', data);
  }

  getDietetics() :any{
    return this.http.get( this.apiUrl + 'dietetics');
  } 
  getRestaurantAdvantages() :any{
    return this.http.get( this.apiUrl + 'restaurantAdvantages');
  } 

  getPopularRestaurants() :any{
    return this.http.get( this.apiUrl + 'restaurants/getPopularRestaurants');
  }

  // getEstablishment() :any{
  //   return this.http.get( this.apiUrl + 'establishment');
  // } 
  // getRestauraant():any{
  //   return this.http.get( this.apiUrl + 'restaurant');
  // } 
   getRestaurants(data) :any{
     if(data.type == "reservation"){
       return  this.http.post( this.apiUrl + 'restaurants/searchRestaurants?page='+data.currentPage, data );

     }else{
      return this.http.post( this.apiUrl + 'establishments/searchEstablishments?page='+data.currentPage, data );
     }
     
   } 
  
  getRestaurant(slug) :any{
    return this.http.get( this.apiUrl + 'restaurants/'+slug );
  } 
  getDetailProducts(slug) :any{
    return this.http.get( this.apiUrl + 'products/'+slug );
  } 

  getDisplayedProductCategories(data) :any{
    return this.http.post( this.apiUrl + 'productCategories/getDisplayedProductCategories', data );
  } 

  getFoundEstablishmentProducts(data) :any{
    return this.http.post( this.apiUrl + 'products/getFoundEstablishmentProducts', data );
  } 

  
  getRestaurantDetail(data) :any{
    return this.http.post( this.apiUrl + 'establishments/getEstablishmentDetails', data );
  } 

  getLoyaltyPoint():any {
    return this.http.get(this.apiUrl + 'users/getUserLoyaltyPoints');
  }
  getRestauReservation(data):any {
  this.http.post( this.apiUrl + 'establishments/getAllEstablishmentCategories', data);
}


}

