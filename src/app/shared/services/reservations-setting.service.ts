import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsSettingService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getReservationPlaces(): any{
    return this.http.get(this.apiUrl+'reservationPlaces/getRestaurantReservationPlaces');
  }
 
  updateReservationPlaces(data): any{
    return this.http.put(this.apiUrl+'reservationPlaces/editRestaurantReservationPlaces',data);
  }

}
