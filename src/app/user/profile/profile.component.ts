import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from './../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId = this.tokenS.getId();

    user: any;
    lastOrdersList : [];
    lastEvaluations: any;
    profileForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl(''),
    email: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    postal_code: new FormControl(''),
    city: new FormControl('')
  })

  constructor(
    private userS: UserService,
    private tokenS: TokenService,
    private translocoS: TranslocoService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.translocoS.selectTranslate('Welcome to your personal space!', null).subscribe(value => this.userS.dataTitle.next(value));
    this.translocoS.selectTranslate('This is where you can manage all your preferences').subscribe(value => this.userS.dataSubTitle.next(value));

   }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.userS.get(this.userId).subscribe(
      data => {
        console.log(data);
        this.lastOrdersList = data.data.last_orders;
        this.lastEvaluations = data.data.last_evaluation;
       //console.log(data.data.last_orders);
        /*this.profileForm.get('firstname').setValue(   data.data.firstname );
        this.profileForm.get('phone_number').setValue(   data.data.phone_number );
        this.profileForm.get('email').setValue(   data.data.email );
        this.profileForm.get('email').setValue(   data.data.email );*/
        this.profileForm.patchValue(data.data);
      },
      error => { },
      () => { }
    )
  }


  profileFormSubmit() {
    /* if(this.profileForm.invalid) return false;
     console.log(this.profileForm.value)*/
    console.log(this.profileForm.value);
    this.userS.update(this.profileForm.value).subscribe((res: any) => {
      console.log('Profil updated successfully!');
      //this.router.navigateByUrl('');
    })
  }



}
