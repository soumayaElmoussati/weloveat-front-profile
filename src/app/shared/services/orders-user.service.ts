import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersUserService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getOrdersOfUser(): any{
    return this.http.get(this.apiUrl + 'users/getUserOrders/20');
  }
 
 

  getLastRestaurant(): any{
    return this.http.get(this.apiUrl + 'users/getLastOrderEstablishments');
  }

}
