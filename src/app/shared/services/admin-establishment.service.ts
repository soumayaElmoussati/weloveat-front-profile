import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminEstablishmentService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getEstablishment(): any{
    return this.http.get(this.apiUrl+'establishments/getAdminEstablishmentDetails');
  }

  updateEstablishment(data){
    return this.http.put(this.apiUrl+'establishments/editEstablishmentDetails', data);
  }

  getReceptionTypes(): any{
    return this.http.get(this.apiUrl+'receptionTypes');
  }

  updateReceptionTypes(data):any{
    return this.http.put(this.apiUrl+'receptionTypes/editEstablishmentReceptionType', data);
  }

  getDeliveryZones(): any{
    return this.http.get(this.apiUrl+'deliveryZones');
  }

  addDeliveryZone(data) :any{
    return this.http.post( this.apiUrl + 'deliveryZones', data );
  } 

  deleteDeliveryZone(id): any{
    return this.http.delete(this.apiUrl + 'deliveryZones/'+id );
  }

  getTimeUnits(): any{
    return this.http.get(this.apiUrl+'establishments/getAllTimeUnits');
  } 

  updateDeliverySchedule(data){
    return this.http.put(this.apiUrl+'deliverySchedules/editDeliverySchedules', data);
  }

  updateOpeningTimes(data){
    return this.http.put(this.apiUrl+'openingTimes/editOpeningTimes', data);
  }


}
