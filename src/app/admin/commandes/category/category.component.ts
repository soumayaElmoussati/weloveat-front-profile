import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryProductService } from 'src/app/shared/services/category-product.service';
import { ConfirmationDeleteCategoryProductComponent } from '../../commandes/category/confirmation-delete-category-product/confirmation-delete-category-product.component';
import { TranslocoService } from '@ngneat/transloco';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})



export class CategoryComponent implements OnInit {

  currentPage: number = 1;
  lastPage = 0;
  perPage = 12;
  productCategoryList: any;
  formSubmiting: boolean = false;
  category : any;

  names = {
    fr: 'name_fr',
    en: 'name_en',
    nl: 'name_nl'
  };
  currentLanguage = new FormControl('fr', Validators.required);

  productCategoryForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(this.names[this.currentLanguage.value], Validators.required),
    display: new FormControl(1),
    position: new FormControl(0)
  });


  constructor(
    private adminS: AdminService,
    private categoryProductS: CategoryProductService,
    public dialog: MatDialog,
    private translocoS: TranslocoService
  ) {
    this.translocoS.selectTranslate('YOUR_PRODUCTS', null).subscribe(value => this.adminS.dataTitle.next(value));
    this.translocoS.selectTranslate('WELCOME_TO_YOUR_MANAGEMENT_SPACE').subscribe(value => this.adminS.dataSubTitle.next(value));

  }



  ngOnInit(): void {
    this.adminS.currentLinkParam.next({ parent: 3, child: 0 });
    this.getproductCategories();
    this.currentLanguage.valueChanges.subscribe(data => {
      this.productCategoryForm.get('name').setValue(this.names[data]);
    })
    this.productCategoryForm.get('name').valueChanges.subscribe(data => {
      this.names[this.currentLanguage.value] = data;
    })
  }



  //

  deleteProductCategory(el, index) {
    const dialog = this.dialog.open(ConfirmationDeleteCategoryProductComponent, {
      data: {
        data: el,
        title: 'Etes-vous sûr de vouloir supprimer cette catégorie?',
        content: "Cette catégorie sera supprimée définitivement. Êtes-vous sûr de vouloir la supprimer?",
        confirmBtn: 'Oui',
        cancelBtn: 'Annuler'
      },
      width: '700px',
      // height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result.confirm) {
        this.categoryProductS.deleteProductCategory(el.id).subscribe(
          data => {
            this.productCategoryList.data;
            this.getproductCategories();
          }
        )
      }
    })

  }

  //

  getCollection(index): any {
    let array = [];
    const pagesBefore = this.currentPage - 1;
    const pagesAfter = index - this.currentPage;
    if (index <= 4) {
      for (let i = 1; i <= index; i++) {
        array.push(i);
      }
      return array;
    }
    if (pagesBefore < 2) {
      if (this.currentPage != 1) array.push(1);
      array.push(this.currentPage);
      array.push(this.currentPage + 1);
      array.push(this.currentPage + 2);
      array.push(index);
    } else if (pagesAfter < 2) {
      array.push(1);
      array.push(this.currentPage - 2);
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
      if (this.currentPage != index) array.push(index);
    } else {
      array.push(1);
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
      array.push(this.currentPage + 1);
      array.push(index);
    }
    if ((array[1] - 1) > 1) array.splice(1, 0, '...');
    if ((index - array[array.length - 2]) > 1) array.splice(array.length - 1, 0, '...');
    return array;
  }

  //

  navigateTo(page) {
    this.currentPage = page;
    this.getproductCategories();
  }


  getproductCategories() {

    this.categoryProductS.getProductCategories(this.perPage).subscribe(

      data => {
        this.productCategoryList = data.data;
        this.lastPage = data.last_page;

     //   console.log('productCategoryList', data);
      },
      error => {
        console.log(error);
      }
    )
  }

  categoryFormSubmit() {
    if (this.productCategoryForm.valid) {

      console.log(this.productCategoryForm.value);
      this.categoryProductS.addProductCategory(this.productCategoryForm.value).subscribe((res: any) => {
        this.getproductCategories();
      })
    }
  }

  ///


  oncategoryFormSubmit() {

    if (this.productCategoryForm.valid) {
      this.formSubmiting = true;
      if (this.productCategoryForm.value.id) {
        this.categoryProductS.updateProductCategory(this.productCategoryForm.value).subscribe((res: any) => {
          this.getproductCategories();
        },
          error => { },
          () => { this.formSubmiting = false }
        )

      } else {
        this.categoryProductS.addProductCategory(this.productCategoryForm.value).subscribe((res: any) => {
          this.getproductCategories();
        },
          error => { },
          () => { this.formSubmiting = false }
        )
      }

    }
  }

  ///

  edit(el, index) {
    this.categoryProductS.getProductCategory(el.id).subscribe(
      data => {
        this.productCategoryForm.get('id').setValue(data.data.id);
        this.productCategoryForm.get('name').setValue(data.data.name);
        this.productCategoryForm.get('display').setValue(data.data.display);
      }
    )
  }

   updatePositionCategory(){
    this.categoryProductS.updatePosition(this.productCategoryList).subscribe(
      data => {        
  
      }
      
    )

   }
 

  drop(event: CdkDragDrop<String[]>) {
  
    moveItemInArray(this.productCategoryList, event.previousIndex, event.currentIndex);
    this.updatePositionCategory();  
  }




}
