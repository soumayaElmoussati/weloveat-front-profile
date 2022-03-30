import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdditionalErrandsService } from 'src/app/shared/services/additional-errands.service';
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from 'src/app/shared/services/token.service';
import { TranslocoService } from '@ngneat/transloco';
import { AdminService } from 'src/app/shared/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeliveryComponent } from 'src/app/admin/commandes/confirmation-delivery/confirmation-delivery.component';


@Component({
  selector: 'app-additional-errands',
  templateUrl: './additional-errands.component.html',
  styleUrls: ['./additional-errands.component.scss']
})
export class AdditionalErrandsComponent implements OnInit {

  currentPage: number = 1;
  additionalErrandsDataSource = new MatTableDataSource(<any>[]);
  displayedColumns: string[] = ['select', 'name', 'address_establishment', 'address_shipping', 'commission', 'statut','update','delete', 'confirmed','action'];
  perPage: number = 10;
  lastPage = 0;
  search = new FormControl('');
  order = new FormControl('ALPHABETICAL');
  NOT_TREATED = new FormControl(true);
  IN_DELIVERY = new FormControl(true);
  READY_FOR_PICKUP = new FormControl(true);
  COMPLETED = new FormControl(true);
  additionalErrandsList: any;
  courseStatus:any;


  constructor(
    private additionalErrandS: AdditionalErrandsService,
    private adminS: AdminService,
    private translocoS: TranslocoService,
    public dialog: MatDialog
  ) {
        this.translocoS.selectTranslate('ADDITIONAL_RACES', null).subscribe(value => this.adminS.dataTitle.next(value));
        this.translocoS.selectTranslate('WELCOME_TO_YOUR_MANAGEMENT_SPACE').subscribe(value => this.adminS.dataSubTitle.next(value));
   }

  ngOnInit(): void {
    this.getAdditionalErrands();
    this.search.valueChanges.subscribe(data => this.getAdditionalErrands());
    this.order.valueChanges.subscribe( data => { this.getAdditionalErrands() } );
    this.getAdditionalErrandStatus();
  }

  getAdditionalErrandStatus(){
    this.additionalErrandS.getAdditionalErrandStatus().subscribe(
      data => { 
        this.courseStatus = data;
        console.log(data);
       },
      error => {},
      () => {}
    )
  }
  //

  getAdditionalErrands(){

    let status = [];
    if(this.NOT_TREATED.value) status.push('NOT_TREATED');
    if(this.IN_DELIVERY.value) status.push('IN_DELIVERY');
    if(this.READY_FOR_PICKUP.value) status.push('READY_FOR_PICKUP');
    if(this.COMPLETED.value) status.push('COMPLETED');
 
    const data = {
      perPage: this.perPage,
      order: this.order.value,
      order_by: null,
      search: this.search.value,
      status_id: "all"
    };

    this.additionalErrandS.getAllAdditionalErrands(data, this.currentPage ).subscribe(
      data => {
        this.additionalErrandsList = data;
        this.lastPage = data.last_page;
        console.log(data);
        this.refrechDataSource();
      }
    )
  }

  refrechDataSource(){
    this.additionalErrandsDataSource = new MatTableDataSource(this.additionalErrandsList.data);  
  }


  confirmErrand(el, index){
    const dialog = this.dialog.open( ConfirmationDeliveryComponent , {
      data : {
        title: 'Êtes-vous sûr de vouloir livrer cette commande',
        content: "Une fois la demande acceptée “Les grillades chez Nikos” recevra une notification pour le prévenir que vous livrez sa commande.",
        confirmBtn: 'CONFIRMER',
        cancelBtn: 'CANCEL' 
      },
      width: '500px',
      height: 'auto',
      disableClose: true
    });
    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.additionalErrandS.confirmErrand(el.id,null).subscribe(
          data => {
          //  this.additionalErrandsList.data;
          this.additionalErrandsList = data;
            this.refrechDataSource();
          }
        )
      }
    })
  }
  //

  navigateTo(page) {
    this.currentPage = page;
    this.getAdditionalErrands();
  }

 //
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



}
