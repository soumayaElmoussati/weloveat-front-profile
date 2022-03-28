import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  getAllProducts(data, page): any{
    return this.http.post(this.apiUrl + 'products/getAllProducts?page='+page, data);
  }

  deleteProduct(id): any{
    return this.http.delete(this.apiUrl + 'products/'+id );
  }

  changeProductStatus(id): any{
    return this.http.put(this.apiUrl + 'products/changeProductStatus/'+id, null);
  }
  
  getAdditionalProducts(): any{
    return this.http.get( this.apiUrl + 'productAdditionalCategories/getEstablishmentAdditionalCategories');
 } 

  deleteAdditionalProduct(id): any{
   return this.http.delete(this.apiUrl + 'productAdditionalCategories/'+id );
 }

  getIngredients(): any{
    return this.http.get(this.apiUrl + 'ingredients/getEstablishmentIngredients');
  }

  getCategories(): any{
    return this.http.get(this.apiUrl + 'productCategories/getDisplayedProductCategories');
  }

  getAdditionalCategory(): any{
    return this.http.get( this.apiUrl + 'productAdditionalCategories/getDisplayedAdditionalCategories');
  }
  
  getAdditionalCategories(data, page): any{
    return this.http.post(this.apiUrl + 'productAdditionalCategories/getAllAdditionalCategories?page='+page, data);
  }

  addProduct(data): any{
    return this.http.post(this.apiUrl + 'products', data );
  }

  getAdditionalCategoryProducts(categ_id): any {
    return this.http.get(this.apiUrl + 'productAdditionalCategories/getAdditionalCategoryProducts/'+categ_id);
  }

  addCategoryAdditional(data): any{
    return this.http.post(this.apiUrl + 'productAdditionalCategories', data );
  }

}
