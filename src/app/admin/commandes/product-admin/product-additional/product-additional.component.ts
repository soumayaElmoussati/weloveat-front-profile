import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ProductAdminService } from 'src/app/shared/services/product-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteAdditionalProductComponent } from '../confirmation-delete-additional-product/confirmation-delete-additional-product.component';
import { AddNewProductAdditionalComponent } from './add-new-product-additional/add-new-product-additional.component';

@Component({
  selector: 'app-product-additional',
  templateUrl: './product-additional.component.html',
  styleUrls: ['./product-additional.component.scss']
})
export class ProductAdditionalComponent implements OnInit {

  additionalProductsList: any;
  currentPage: number = 1;
  lastPage = 0;
  additionalProductsDataSource = new MatTableDataSource(<any>[]);
  displayedColumns: string[] = ['display','name', 'options' ,'action'];
  perPage: number = 10;
  search = new FormControl('');
  order = new FormControl('ALPHABETICAL');
  statusDisabled = new FormControl(1);
  statusEnabled = new FormControl(1);
  Display = true;

  constructor(
    private productAdminS: ProductAdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAdditionalCategories();
    this.search.valueChanges.subscribe( data => this.getAdditionalCategories() );
    this.order.valueChanges.subscribe( data => this.getAdditionalCategories() );
  }

  refrechDataSource(){
    this.additionalProductsDataSource = new MatTableDataSource(this.additionalProductsList.data);  
  }


  //

  getAdditionalCategories(){

    const data = {
      perPage: this.perPage,
      order: this.order.value,
      search: this.search.value,
    };
    this.productAdminS.getAdditionalCategories(data,this.currentPage).subscribe(
      data => {
        this.additionalProductsList = data;
        this.lastPage = data.last_page;
        this.refrechDataSource();
        console.log(data);
      }
    )
  }

  //
  
  deleteAdditionalProduct(el, index) {
    const dialog = this.dialog.open(ConfirmationDeleteAdditionalProductComponent, {
      data: {
        data: el,
        title: 'Etes-vous sûr de vouloir supprimer ce produit annexe?',
        content: "Ce produit annexe sera supprimée définitivement. Êtes-vous sûr de vouloir la supprimer?",
        confirmBtn: 'Oui',
        cancelBtn: 'Annuler'
      },
      width: '700px',
      // height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result.confirm) {
        this.productAdminS.deleteAdditionalProduct(el.id).subscribe(
          data => {
            this.additionalProductsList.data;
            this.getAdditionalCategories();
          }
        )
      }
    })
  }
  //

  editAdditionalProduct(el, index) {
    const dialog = this.dialog.open(AddNewProductAdditionalComponent, {
       data:el
    });

     dialog.afterClosed().subscribe(data => {
       
    })  

  }
  //

  addProductAdditional(){
    const dialog = this.dialog.open(AddNewProductAdditionalComponent, {
      
    });

     dialog.afterClosed().subscribe(data => {
     
    })  
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

  //

  navigateTo(page){
    this.currentPage = page;
    this.getAdditionalCategories();
}
  

}


