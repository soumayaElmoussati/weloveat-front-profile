import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = environment.apiUrl;

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

  getChartData(filtre):any{
    return this.http.get(this.apiUrl + 'establishments/salesStatistics/'+filtre );
  }

  getStatistics():any {
    return this.http.get(this.apiUrl + 'establishments/statistics');
  }


}
