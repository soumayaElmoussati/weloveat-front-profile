import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAdresseComponent } from '../dialog-adresse/dialog-adresse.component';
import { Router } from '@angular/router';
import { AdresseService } from './../../shared/services/adresse.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConfirmationComponent } from './../../user/confirmation/confirmation.component';
import { UserService } from 'src/app/shared/services/user.service';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss']
})
export class AdressesComponent implements OnInit {

  userId = this.tokenS.getId();
  selectedAddress: string;
  addressList : any;
  adUserImgUrl = environment.addressImgUrl;
  currentPage: number = 1;

  constructor(
    private AdresseS: AdresseService,
    private userS: UserService,
    private translocoS: TranslocoService,
    private tokenS: TokenService,
    public dialog: MatDialog,
    private router: Router
  ) 
  {
    this.userS.currentLinkParam.next({ parent:4, child:0 });
    this.translocoS.selectTranslate('Your addresses', null).subscribe(value => this.userS.dataTitle.next(value));
    this.translocoS.selectTranslate('This is where you can manage all your delivery addresses').subscribe(value => this.userS.dataSubTitle.next(value));
   }

  ngOnInit(): void {
    this.getAddress();
  }

  /*openDialog() {
    const dialog = this.dialog.open(DialogAdresseComponent, {
      panelClass:'bordered-dialog'
    });

  }*/

  
  addAddressToUser(address){
    const dialog = this.dialog.open(DialogAdresseComponent, {
      data : address 
    });

     dialog.afterClosed().subscribe(data => {
         this.addressList.data;
         this.getAddress();
    })


    
  }


  getAddress(){
    this.AdresseS.getAddressOfUser().subscribe(
 
      data => {
        this.addressList = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )

  }

  deleteAddress(el){
    const dialog = this.dialog.open( ConfirmationComponent, {
      data : {
        data : el,
        title: 'Etes-vous sûr de vouloir supprimer cette adresse?',
        confirmBtn: 'Oui',
        cancelBtn: 'Annuler' 
      },
        width: '700px',
     // height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.AdresseS.deleteAddress(el.id).subscribe(
          data => {
            this.addressList.data;
            this.getAddress();

          }
        )
      }
    })

  }
  
 
  



}

