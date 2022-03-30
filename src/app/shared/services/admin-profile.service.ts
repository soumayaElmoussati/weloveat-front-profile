import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

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

  coverPicture = new BehaviorSubject(null);
  newCoverPicture = this.coverPicture.asObservable();

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

  getAdminProfile():any{
    return this.http.get(this.apiUrl + 'establishments/showAdminProfil');
  }



  updateCoverPicture(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('picture', file);
    const req = new HttpRequest('POST', `${this.apiUrl}establishments/editPicture`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
