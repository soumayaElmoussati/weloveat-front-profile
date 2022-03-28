import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class OrdersAdminService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  /* getAllOrders(data): any{
    return this.http.post(this.apiUrl + 'orders/getEstablishmentOrders', data);
  }*/

  getAllOrders(data, page): any{
    return this.http.post(this.apiUrl + 'orders/getEstablishmentOrders?page='+page, data);
  }

   getOrderStatus(){
    return this.http.get(this.apiUrl + 'orderStatuses');
  }

  getDetailsOrder(id): any{
    return this.http.get(this.apiUrl+'orders/'+id);
  }

  confirmeOrder(id, data){
    return this.http.put(this.apiUrl + 'orders/confirmOrder/' + id, data);
  }

  sendNotificationShipping(id, data){
    return this.http.put(this.apiUrl + 'orders/notifyForShipping/' + id, data);
  }

  closeOrder(id, data){
    return this.http.put(this.apiUrl + 'orders/closeOrder/' + id, data);
  }

  deleteOrder(id): any{
    return this.http.delete(this.apiUrl + 'orders/'+id );
  }
  




}
