import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/services/token.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AdminProfileService } from 'src/app/shared/services/admin-profile.service';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {

  userId = this.tokenS.getId();

  currentPage: number = 1;
  profile: any;
  profileForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl(''),
    email: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    postal_code: new FormControl(''),
    city: new FormControl('')
  });

   companyForm = new FormGroup({
    id: new FormControl(''),
    billing_address: new FormControl('', Validators.required),
    city: new FormControl(''),
    email: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    vat: new FormControl('', Validators.required),
    postal_code: new FormControl(''),
    name: new FormControl('')
  });

  restauImgUrl = environment.restaurantImgUrl;
  establishment : any;
  coverImagePath: any;
  coverImageProgress = 0;

  constructor(
    private adminS: AdminService,
    private tokenS: TokenService,
    private adminProfileS: AdminProfileService
  ) { }

  ngOnInit(): void {
    this.adminS.currentLinkParam.next({ parent:7, child:0 });
    this.getProfile();
    this.getCompany();
    this.getAdminProfile();
  }

  getProfile() {
    this.adminProfileS. getProfile(this.userId).subscribe(
      data => {
        console.log(data);
        this.profileForm.patchValue(data.data);
      },
      error => { },
      () => { }
    )
  }

  profileFormSubmit() {

    console.log(this.profileForm.value);
    this.adminProfileS.update(this.profileForm.value).subscribe((res: any) => {
      console.log('Profil updated successfully!');
    })
  }

  getCompany() {
    this.adminProfileS.getCompanyofUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.companyForm.patchValue(data.data);
      },
      error => { },
      () => { }
    )
  }

//
  
getAdminProfile() {
  this.adminProfileS.getAdminProfile().subscribe(
    data => {
      this.establishment = data.data;
      console.log('showAdminProfil',data);
 
    },
    error => { },
    () => { }
  )
}

  //

  companyFormSubmit() {
    console.log(this.companyForm.value);
    this.adminProfileS.updateCompany(this.companyForm.value).subscribe((res: any) => {
      console.log('Company updated successfully!');
    })
  }


  onEditCoverPicture(event){
    let file = event.target.files[0];
    if (file) { 
      this.uploadCoverPicture(file);
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.coverImagePath  = reader.result as string;
      }
      reader.readAsDataURL(file);
     
    }
  }

  uploadCoverPicture(file){
    this.coverImageProgress = 0;
    if (file) {
      this.adminProfileS.updateCoverPicture(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.coverImageProgress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.adminProfileS.coverPicture.next(event.body.imageName);
          }
        },
        (err: any) => {
          this.coverImageProgress = 0;
          //console.log('Could not upload the file: ' + file.name);
        },
        () => {         
        }
        );     
    }   
  }

}


