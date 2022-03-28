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



  

}
