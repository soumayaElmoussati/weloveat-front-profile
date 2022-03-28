import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationAdminService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  getRequests() :any{
    return this.http.get( this.apiUrl + 'reservations/getReservationRequests/5');
  }

  getAcceptedReservations(data, page): any{
    return this.http.post(this.apiUrl + 'reservations/getAcceptedReservations?page='+page, data);
  }

  confirmAcceptReservation(id): any{
    return this.http.put(this.apiUrl + 'reservations/acceptReservation/'+id, id);
  }

  confirmRefuseReservation(id): any{
    return this.http.put(this.apiUrl + 'reservations/refuseReservation/'+id, id);
  }

}
