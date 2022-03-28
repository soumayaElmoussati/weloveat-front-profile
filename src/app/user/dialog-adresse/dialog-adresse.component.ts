import { Component, OnInit ,Inject } from '@angular/core';
import { AdresseService } from './../../shared/services/adresse.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-adresse',
  templateUrl: './dialog-adresse.component.html',
  styleUrls: ['./dialog-adresse.component.scss']
})
export class DialogAdresseComponent implements OnInit {

  addresseForm = new FormGroup({
    id: new FormControl(''),
    label: new FormControl(''),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    default: new FormControl(false),
    comment: new FormControl(''),
    postal_code: new FormControl(''),
    pictogram: new FormControl('', Validators.required)
  });

  pictogramsList = null;

  adUserImgUrl = environment.addressImgUrl;
  constructor(
    private AdresseS: AdresseService,
    private router: Router,
    private tokenS: TokenService,
    public dialogRef: MatDialogRef<DialogAdresseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { 
      if(this.data){
        this.addresseForm.get('id').setValue(this.data.id);
        this.addresseForm.get('label').setValue(this.data.label);
        this.addresseForm.get('city').setValue(this.data.city);
        this.addresseForm.get('address').setValue(this.data.address);
        this.addresseForm.get('postal_code').setValue(this.data.postal_code);
        this.addresseForm.get('comment').setValue(this.data.comment);    
        this.addresseForm.get('default').setValue(this.data.default);  
      }
   
  }

  ngOnInit(): void {
    this.getAllPictograms();
  }



  addressFormSubmit() {
    if (this.addresseForm.valid) {
      if(this.addresseForm.value.id){
        this.AdresseS.updateAddressOfUser(this.addresseForm.value).subscribe((res: any) => {
          // console.log('Address added successfully!');
           this.dialogRef.close(res.data);
         })
      }else{
        console.log(this.addresseForm.value);
        this.AdresseS.addAddressOfUser(this.addresseForm.value).subscribe((res: any) => {
         // console.log('Address added successfully!');
          this.dialogRef.close(res.data);
        })
      }

  
    }
  }


  //

  getAllPictograms() {
    this.AdresseS.getPictograms().subscribe(
      data => {
        this.pictogramsList = data.data;
        this.addresseForm.get('pictogram').setValue(this.pictogramsList[0]);
      }
    )
  }





}
