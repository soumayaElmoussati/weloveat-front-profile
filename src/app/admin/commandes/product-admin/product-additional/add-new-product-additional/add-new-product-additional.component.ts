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

      console.log(this.categoryAdditionalForm.value);
      this.productAdminS.addCategoryAdditional(this.categoryAdditionalForm.value).subscribe((res: any) => {
        this.dialogRef.close(res.data);
      })
    }
  }
//
onCancel(){
  this.dialogRef.close();
}


}