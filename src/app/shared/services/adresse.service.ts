import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  getAddressOfUser(): any{
    return this.http.get(this.apiUrl + 'users/getUserAddresses');
  }

  getAddressOfUserLabel(): any{
    return this.http.get(this.apiUrl + 'addresses/getUserAdressesLabels');
  }

  getAddressUserLabel(label): any{
    return this.http.get(this.apiUrl + 'addresses/getAddressUsingLabel/'+label);
  }

  
  addAddressOfUser(data){
    return this.http.post(this.apiUrl + 'addresses', data);
  }

  updateAddressOfUser(data){
    return this.http.put(this.apiUrl + 'addresses/'+data.id, data);
  }

  getPictograms():any{
    return this.http.get(this.apiUrl+ 'pictograms');
  }
  
  deleteAddress(id): any{
    return this.http.delete(this.apiUrl + 'addresses/'+id );
  }



}
 