import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {

  currentPage: number = 1;

  inviteForm = new FormGroup({
    email: new FormControl('', Validators.required)
  })

  constructor(
    private userS: UserService,
    private translocoS: TranslocoService
  ) 
  {
    this.userS.currentLinkParam.next({ parent:6, child:0 });
    this.translocoS.selectTranslate('Invite your friends to join weloveat!', null).subscribe(value => this.userS.dataTitle.next(value));
    this.translocoS.selectTranslate('Send them an invitation using the form below!').subscribe(value => this.userS.dataSubTitle.next(value));
   }

  ngOnInit(): void {
  }


  inviteFormSubmit() {
    console.log(this.inviteForm.value);
    this.userS.InviteClient(this.inviteForm.value).subscribe((res: any) => {
      console.log('Email envoyed successfully!');
    })
  }


}
