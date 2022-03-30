import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { OrdersAdminService } from 'src/app/shared/services/orders-admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteComponent } from 'src/app/admin/commandes/confirmation-delete/confirmation-delete.component';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  currentPage: number = 1;
  lastPage = 0;
  ordersDataSource = new MatTableDataSource(<any>[]);
  displayedColumns: string[] = ['select', 'name', 'address', 'montant', 'paiement', 'reception_type', 'statut','update','delete','action'];
  orderStatusList: any;
  pagination = [];
  perPage: number = 10;
  search = new FormControl('');
  order = new FormControl('ALPHABETICAL');
  DELIVERY = new FormControl(true);
  TAKEAWAY = new FormControl(true);
  selectedStatus = new FormControl();
  ordersList: any;



  constructor(
    private adminS: AdminService,
    private orderAdminS: OrdersAdminService,
    public dialog: MatDialog,
    private translocoS: TranslocoService,
    private router: Router
  ) {
        this.translocoS.selectTranslate('Your orders', null).subscribe(value => this.adminS.dataTitle.next(value));
        this.translocoS.selectTranslate('WELCOME_TO_YOUR_MANAGEMENT_SPACE').subscribe(value => this.adminS.dataSubTitle.next(value));
   }

  ngOnInit(): void {

    this.adminS.currentLinkParam.next({ parent:2, child:0 });
    this.getOrderStatus();
    this.getOrders();
    this.search.valueChanges.subscribe( data => this.getOrders() );
    this.order.valueChanges.subscribe( data => { this.getOrders() } );
    this.DELIVERY.valueChanges.subscribe( data => this.getOrders() );
    this.TAKEAWAY.valueChanges.subscribe( data => this.getOrders() );
    this.selectedStatus.valueChanges.subscribe( data => this.getOrders());

  }

  getOrders(){

    let reception_types = [];
    if(this.DELIVERY.value) reception_types.push('DELIVERY');
    if(this.TAKEAWAY.value) reception_types.push('TAKEAWAY');

 
    const data = {
      perPage: this.perPage,
      order: this.order.value,
      order_by: null,
      reception_types: reception_types,
      search: this.search.value,
      currentPage: this.currentPage,
      status_id:  this.selectedStatus.value ? this.selectedStatus.value.id : 'all'
     // status_id: "all"

    };

    this.orderAdminS.getAllOrders(data,this.currentPage ).subscribe(
      data => {
        this.ordersList = data;
        this.lastPage = data.last_page;
       // console.log(data);
        this.refrechDataSource();

      }
    )
  }

  refrechDataSource(){
    this.ordersDataSource = new MatTableDataSource(this.ordersList.data);  
  }

  
  getOrderStatus(){
    this.orderAdminS.getOrderStatus().subscribe(
      data => { 
        this.orderStatusList = data;
        console.log(data);
      }
    )
  }

  

  delete(el, index){
    const dialog = this.dialog.open( ConfirmationDeleteComponent , {
      data : {
        title: 'Êtes-vous sûr de vouloir supprimer cette commande',
        content: "Cette commande sera supprimée définitivement. Êtes-vous sûr de vouloir la supprimer?",
        confirmBtn: 'CONFIRMER',
        cancelBtn: 'CANCEL' 
      },
      width: '500px',
      height: 'auto',
      disableClose: true
    });
    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.orderAdminS.deleteOrder(el.id).subscribe(
          data => {
            this.ordersList.data.splice(index, 1 );
            this.refrechDataSource();
          }
        )
      }
    })
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
    this.getOrders();
  }


}


