import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { InvoicesAdminService } from 'src/app/shared/services/invoices-admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export class FacturesComponent implements OnInit {

  currentPage: number = 1;
  lastPage = 0;
  invoicesList: any;
  invoicesDataSource = new MatTableDataSource(<any>[]);
  displayedColumns: string[] = ['select', 'date', 'invoice', 'amount', 'pdf'];
  perPage: number = 10;
  startDate = new FormControl();
  endDate = new FormControl();
  maxDate = new Date();

  constructor(
    private adminS: AdminService,
    private invoicesAdminS: InvoicesAdminService,
    private datePipe: DatePipe,
    private translocoS: TranslocoService
  ) {
        this.translocoS.selectTranslate('YOUR_INVOICES', null).subscribe(value => this.adminS.dataTitle.next(value));
        this.translocoS.selectTranslate('Welcome to your management space').subscribe(value => this.adminS.dataSubTitle.next(value));
  }

  ngOnInit(): void {

    this.adminS.currentLinkParam.next({ parent:5, child:0 });
    this.getInvoices();
    this.startDate.valueChanges.subscribe(
      data => { if(this.rangeSelected() ) this.getInvoices(); }
    )
    this.endDate.valueChanges.subscribe(
      data => { if(this.rangeSelected() ) this.getInvoices(); }
    )

  }

  rangeSelected(): boolean{
    if(this.startDate.value && this.endDate.value) return true;
    return false;
  }

  refrechDataSource(){
    this.invoicesDataSource = new MatTableDataSource(this.invoicesList.data);  
  }

  getInvoices(){
    const data = {
      perPage: this.perPage,
      start_date: this.datePipe.transform(this.startDate.value, 'dd-MM-yyyy' ),
      end_date: this.datePipe.transform(this.endDate.value, 'dd-MM-yyyy' )
    };
    this.invoicesAdminS.getAllInvoices(data, this.currentPage).subscribe(
      data => {
        this.invoicesList = data;
        this.lastPage = data.last_page;
        console.log(data);
        this.refrechDataSource();
      }
    )
  }

  onDownloadFile(file, number){
     this.invoicesAdminS.downloadInvoice(file).subscribe(
      data => {
        let file = new Blob([<any>data], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(file);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = number;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    )
  }

  //

  onExport(file){

  /*  const data = {
      start_date: this.datePipe.transform(this.startDate.value, 'dd-MM-yyyy' ),
      end_date: this.datePipe.transform(this.endDate.value, 'dd-MM-yyyy' )
    };
    this.invoicesAdminS.exportInvoices(data).subscribe(
      data => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = 'factures.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);;
      }
    )*/

    const data = {
      start_date: this.datePipe.transform(this.startDate.value, 'dd-MM-yyyy' ),
      end_date: this.datePipe.transform(this.endDate.value, 'dd-MM-yyyy' )
    };
    this.invoicesAdminS.exportInvoices(data).subscribe(
      data => {
        let file = new Blob([<any>data], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(file);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'factures.zip';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    )

  }

  getCollection(index): any {
    let array = [];    
    const pagesBefore = this.currentPage - 1;
    const pagesAfter = index - this.currentPage;
    if(index <= 4){
      for (let i = 1; i <= index; i++) {
        array.push(i);
      }
      return array;
    }
    if (pagesBefore < 2) {
      if(this.currentPage != 1) array.push(1);
      array.push(this.currentPage);
      array.push(this.currentPage + 1);
      array.push(this.currentPage + 2);
      array.push(index);
    } else if (pagesAfter < 2) {
      array.push(1);
      array.push(this.currentPage - 2);
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
      if(this.currentPage != index) array.push(index);
    } else {
      array.push(1);
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
      array.push(this.currentPage + 1);
      array.push(index);
    }
    if((array[1] - 1) > 1) array.splice(1, 0, '...');
    if((index - array[array.length - 2]) > 1) array.splice(array.length-1, 0, '...');
    return array;
  }

  navigateTo(page) {
    this.currentPage = page;
    this.getInvoices();
  }



  

}
