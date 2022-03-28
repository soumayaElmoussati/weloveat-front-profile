import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AdditionalErrandsService {

  apiUrl = environment.apiUrl;


  constructor(
    private http: HttpClient,
    private tokenS: TokenService
  ) { }

  getAllAdditionalErrands(data, page): any{
    return this.http.post(this.apiUrl + 'additionalErrands/getEstablishmentAdditionalErrands?page='+page, data);
  }

  getDetailsCourse(id): any{
    return this.http.get(this.apiUrl+'additionalErrands/'+id);
  }

  confirmErrand(id, data){
    return this.http.put(this.apiUrl + 'additionalErrands/confirmErrand/'+ id, data);
  }

  sendNotification(id, data){
    return this.http.put(this.apiUrl + 'additionalErrands/deliveryNotification/' + id, data);
  }

  closeErrand(id, data){
    return this.http.put(this.apiUrl + 'additionalErrands/closeErrand/' + id, data);
  }

  getAdditionalErrandStatus(){
    return this.http.get(this.apiUrl + 'additionalErrandStatuses');
  }

}
