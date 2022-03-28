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

  addProductAdditional(){
    const dialog = this.dialog.open(AddNewProductAdditionalComponent, {
      
    });

     dialog.afterClosed().subscribe(data => {
     
    })  
  }
  

}


