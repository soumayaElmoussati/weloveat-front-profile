import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

 /* getProductCategories(): any{
    return this.http.get(this.apiUrl + 'productCategories/getAllProductCategories/10');
  }*/

  getProductCategories(perPage) :any{
     return this.http.get( this.apiUrl + 'productCategories/getAllProductCategories/'+perPage );
  } 

  addProductCategory(data): any{
    return this.http.post(this.apiUrl + 'productCategories', data );
  }

  updateProductCategory(data){
    return this.http.put(this.apiUrl + 'productCategories/'+data.id, data);
  }

  deleteProductCategory(id): any{
    return this.http.delete(this.apiUrl + 'productCategories/'+id );
  }

  getProductCategory(id) :any{
    return this.http.get(this.apiUrl + 'productCategories/'+id );
 } 

  updatePosition(data): any{

    return this.http.put(this.apiUrl + 'establishments/editPosition', {
      element: data,
      category : true
    });
 }

}
