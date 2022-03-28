import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsAdminService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getEvaluations(perPage) :any{
    return this.http.get( this.apiUrl + 'establishments/getEstablishmentEvaluations/'+perPage );
 } 

 getEstablishmentScore() :any{
  return this.http.get( this.apiUrl + 'establishments/getEstablishmentScore');
} 



}
