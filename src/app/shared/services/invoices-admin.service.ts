import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoicesAdminService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  getAllInvoices(data, page): any{
    return this.http.post(this.apiUrl + 'invoices/getEstablishmentInvoices?page='+page, data);
  }

  downloadInvoice(id){
    return this.http.get(this.apiUrl + 'invoices/invoice_pdf/' + id , {responseType:'arraybuffer' as 'json'} );
  }

   exportInvoices(data){
    return this.http.post(this.apiUrl + 'invoices/exportAllInvoices', data, {responseType: 'blob' as 'json'} );
  }


}
