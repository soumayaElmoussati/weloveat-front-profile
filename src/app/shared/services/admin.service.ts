import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  dataTitle = new BehaviorSubject(null);
  currentdataTitle = this.dataTitle.asObservable();
  dataSubTitle = new BehaviorSubject(null);
  currentdataSubTitle = this.dataSubTitle.asObservable();
  dataBackTo = new BehaviorSubject(null);
  currentdataBackTo = this.dataBackTo.asObservable();
  currentLinkParam = new BehaviorSubject<any>([]);
  changeVar = this.currentLinkParam.asObservable();

  constructor() { }
}
