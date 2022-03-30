import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ProductAdminService } from 'src/app/shared/services/product-admin.service';

@Component({
  selector: 'app-add-new-product-additional',
  templateUrl: './add-new-product-additional.component.html',
  styleUrls: ['./add-new-product-additional.component.scss']
})
export class AddNewProductAdditionalComponent implements OnInit {

  categoryAdditionalForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private productAdminS: ProductAdminService,
    public dialogRef: MatDialogRef<AddNewProductAdditionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.categoryAdditionalForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      display: new FormControl(1),
      multi_select: new FormControl(false),
      position: new FormControl(0),
      products: this.formBuilder.array([]) ,
    });
  }

  ngOnInit(): void {
    this.addProduct();

    if(this.data){
      this.categoryAdditionalForm.get('id').setValue(this.data.id);
      this.categoryAdditionalForm.get('name').setValue(this.data.name);
      this.categoryAdditionalForm.get('multi_select').setValue(this.data.multi_select);
   //  this.categoryAdditionalForm.get('products').setValue(this.data.products);
      this.categoryAdditionalForm.get('products').setValue([
        { name: this.data.products.name,  price: 12}
     
      ]);
      console.log('Value',this.data.products.name)
    }
  }

  products() : FormArray {
    return this.categoryAdditionalForm.get("products") as FormArray
  }


  newProduct(): FormGroup {
    return this.formBuilder.group({
      name: '',
      price: '',
    })
  }

  //

  addProduct() {
    this.products().push(this.newProduct());
  }

  onSubmit(){
    if (this.categoryAdditionalForm.valid) {
      if(this.categoryAdditionalForm.value.id){
          this.productAdminS.updateProductAdditionalCategories(this.categoryAdditionalForm.value).subscribe((res:any) => {
            this.dialogRef.close(res.data);
          } )
      }else{
        console.log(this.categoryAdditionalForm.value);
        this.productAdminS.addCategoryAdditional(this.categoryAdditionalForm.value).subscribe((res: any) => {
          this.dialogRef.close(res.data);
        })
      }

     
    }
  }
//
onCancel(){
  this.dialogRef.close();
}


}
