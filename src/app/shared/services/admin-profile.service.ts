import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

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
    private http: HttpClient
  ) { }

  getProfile(id): any{
    return this.http.get(this.apiUrl+'users/'+id);
  }

  update(data){
    return this.http.put(this.apiUrl+'users/'+data.id, data);
  }

  getCompanyofUser(id):any{
    return this.http.get(this.apiUrl + 'companies/'+id);
  }

  updateCompany(data){
    return this.http.put(this.apiUrl+'companies/'+data.id, data);
  }



}
