import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  dataTitle = new BehaviorSubject(null);
  currentdataTitle = this.dataTitle.asObservable();
  dataSubTitle = new BehaviorSubject(null);
  currentdataSubTitle = this.dataSubTitle.asObservable();
  dataBackTo = new BehaviorSubject(null);
  currentdataBackTo = this.dataBackTo.asObservable();
  currentLinkParam = new BehaviorSubject<any>([]);
  changeVar = this.currentLinkParam.asObservable();


  constructor(
    private http: HttpClient,
    private tokenS: TokenService
  ) { }

  get(id): any{
    return this.http.get(this.apiUrl+'users/'+id);
  }

   update(data){
    return this.http.put(this.apiUrl+'users/'+data.id, data);
  }

  getFavoris(): any{
    return this.http.get(this.apiUrl +'users/getFavoriteEstablishments/12');
  }

  getReservations(): any{
    return this.http.get(this.apiUrl +'users/getUserReservations/12');
  }

  getLastOrder(): any{
    return this.http.get(this.apiUrl + 'users/getLastOrderEstablishments');
  }

  follow(data): any {
    return this.http.post(this.apiUrl + 'users/addToFavoritesList/'+ data.id, data);
  }

  getLoyaltyPoint():any {
    return this.http.get(this.apiUrl + 'users/getUserLoyaltyPoints');
  }

  InviteClient(data):any {
    return this.http.post(this.apiUrl + 'users/inviteClient',data);
  }


}
