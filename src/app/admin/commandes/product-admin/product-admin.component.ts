import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ProductAdminService } from 'src/app/shared/services/product-admin.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteProductComponent } from './confirmation-delete-product/confirmation-delete-product.component';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit {

  ProdImgUrl = environment.productImgUrl;
  currentPage: number = 1;
  perPage: number = 10;
  lastPage = 0;
  productsDataSource = new MatTableDataSource(<any>[]);
  displayedColumns: string[] = ['picture','display','name', 'description','category', 'price','ingredient' ,'action'];
  search = new FormControl('');
  order = new FormControl('ALPHABETICAL');
  statusDisabled = new FormControl(1);
  statusEnabled = new FormControl(1);
  Display = true;
  productsList: any;
 



  constructor(
    private productAdminS: ProductAdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.getProducts();
    this.statusDisabled.valueChanges.subscribe( data => this.getProducts() );
    this.statusEnabled.valueChanges.subscribe( data => this.getProducts() );
    this.search.valueChanges.subscribe( data => this.getProducts() );
    this.order.valueChanges.subscribe( data => this.getProducts() );
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

  navigateTo(page){
      this.currentPage = page;
      this.getProducts();
  }

  refrechDataSource(){
    this.productsDataSource = new MatTableDataSource(this.productsList.data);  
  }

  getProducts(){
    let statuses = [];
    if(this.statusEnabled.value) statuses.push('1');
    if(this.statusDisabled.value) statuses.push('0');
    const data = {
      perPage: this.perPage,
      order: this.order.value,
      search: this.search.value,
      statuses: statuses
    };
    this.productAdminS.getAllProducts(data,this.currentPage).subscribe(
      data => {
        this.productsList = data;
        this.lastPage = data.last_page;
        this.refrechDataSource();
        console.log(data);
      }
    )
  }

  //

  deleteProduct(el, index) {
    const dialog = this.dialog.open(ConfirmationDeleteProductComponent, {
      data: {
        data: el,
        title: 'Etes-vous sûr de vouloir supprimer ce produit?',
        content: "Ce produit sera supprimée définitivement. Êtes-vous sûr de vouloir la supprimer?",
        confirmBtn: 'Oui',
        cancelBtn: 'Annuler'
      },
      width: '700px',
      // height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result.confirm) {
        this.productAdminS.deleteProduct(el.id).subscribe(
          data => {
            this.productsList.data;
            this.getProducts();
          }
        )
      }
    })
  }

  //
  onChange(id,index){
    this.productAdminS.changeProductStatus(id).subscribe(
      data => {
        this.productsList.data[index].display = data.display;
        this.refrechDataSource();
      }
    )
  }
 //





}
