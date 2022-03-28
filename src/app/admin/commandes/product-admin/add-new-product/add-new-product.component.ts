import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductAdminService } from 'src/app/shared/services/product-admin.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';   
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(),
    display: new FormControl(),
    ingredients: new FormControl(),
    ingredientCtrl: new FormControl(),
    categories: new FormControl(),
    categoryCtrl: new FormControl(),
    position: new FormControl(0),
    additional_category: new FormControl()

  });

  isShown: boolean = false ; 

  names = {
    fr: 'name_fr', en: 'name_en', nl: 'name_nl'     
     };

  descriptions = {
    fr: 'description_fr', en: 'description_en', nl: 'description_nl'     
     }; 

  currentLanguage = new FormControl('fr', Validators.required);

  additionalCategoryList: any;
  additionalCategoryProdList: any;
  selectedIngredient: any = [];
  ingredientsList: any;
  selectedCategory: any = [];
  categoriesList: any;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredIngredients: Observable<string[]>;
  filteredCategories: Observable<string[]>;
  formSubmiting: boolean = false;

  @ViewChild('ingredientInput') ingredientInput: ElementRef;
  @ViewChild('categoryInput') categoryInput: ElementRef;


  constructor(
    private productAdminS: ProductAdminService
  ) { }

  ngOnInit(): void {
    this.getIngredients();
    this.getCategories();
    this.getAdditionalCategories();
    this.productForm.get('additional_category').valueChanges.subscribe(
      data => this.getAdditionalCategoryProducts()
    );

    this.currentLanguage.valueChanges.subscribe(data => {
      this.productForm .get('name').setValue(this.names[data]);
    })
    this.productForm .get('name').valueChanges.subscribe(data => {
      this.names[this.currentLanguage.value] = data;
    })

    this.currentLanguage.valueChanges.subscribe(data => {
      this.productForm.get('description').setValue(this.descriptions[data]);
    })
    this.productForm.get('description').valueChanges.subscribe(data => {
      this.names[this.currentLanguage.value] = data;
    })
  }

  getIngredients(){
    this.productAdminS.getIngredients().subscribe(
      data => { 
        this.ingredientsList = data ;
         this.ingredientsList = this.ingredientsList.data
       //   console.log(data);
        },
      error => {},
      () => {
        this.filteredIngredients = this.productForm.get('ingredientCtrl').valueChanges.pipe(
          startWith(null),
         map((ingredient: string | null) => ingredient ? this._filterIngredient(ingredient) : this.ingredientsList.slice()));
      }
    )
  }

  //
  selectedIng(event: MatAutocompleteSelectedEvent): void {
    this.selectedIngredient.push(event.option.value);
    this.ingredientInput.nativeElement.value = '';
    this.productForm.get('ingredientCtrl').setValue(null);
  }

  //

  private _filterIngredient(value: any): any[] {
    let name = value.name ? value.name : value;
    return this.ingredientsList.filter(ingredient => ingredient.name.toLowerCase().includes(name.toLowerCase()));
  }
  
  //

  addIngredient(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.selectedIngredient.push({
        id:Math.random(),
        name:value.trim()
      });
    }
    // Reset the input value
    if (input) { 
      input.value = '';
    }
    this.productForm.get('ingredientCtrl').setValue(null);
  }

  //

  removeIngredient(indx): void {
    this.selectedIngredient.splice(indx, 1);
  }


  private _filterCategory(value: any): any[] {
    let name = value.name ? value.name : value;
    return this.categoriesList.filter(category => category.name.toLowerCase().includes(name.toLowerCase()));
  }

    //

    addCategory(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      if ((value || '').trim()) {
        this.selectedCategory.push({
          id:Math.random(),
          name:value.trim()
        });
      }
      // Reset the input value
      if (input) { 
        input.value = '';
      }
      this.productForm.get('categoryCtrl').setValue(null);
    }
  
    //

    removeCategory(indx): void {
      this.selectedCategory.splice(indx, 1);
    }
    
    selectedCat(event: MatAutocompleteSelectedEvent): void {
      this.selectedCategory.push(event.option.value);
      this.categoryInput.nativeElement.value = '';
      this.productForm.get('categoryCtrl').setValue(null);
    }
    //

    getCategories(){
      this.productAdminS.getCategories().subscribe(
        data => { 
          this.categoriesList = data ;
           this.categoriesList = this.categoriesList.data
            console.log('categories',data);
          },
        error => {},
        () => {
          this.filteredCategories = this.productForm.get('categoryCtrl').valueChanges.pipe(
            startWith(null),
           map((category: string | null) => category ? this._filterCategory(category) : this.categoriesList.slice()));
        }
      )
    }

    //
    getAdditionalCategoryProducts(){
      this.productAdminS.getAdditionalCategoryProducts(this.productForm.get('additional_category').value.id).subscribe(
        data => {  
          this.additionalCategoryList = data;
          this.additionalCategoryProdList = data.data;
          console.log('test',this.productForm.get('additional_category').value.id);
        }
      )
    }

    //
    
  getAdditionalCategories() {

    this.productAdminS.getAdditionalCategory().subscribe(

      data => {
        this.additionalCategoryList = data.data;
        console.log('additionalCategoryList', data);
      },
      error => {
        console.log(error);
      }
    )
  }

  //

  onproductFormSubmit(){
    this.productAdminS.addProduct(this.productForm.value).subscribe((res: any) => {
      
    },
      error => { },
      () => { this.formSubmiting = false }
    )
  }




}
