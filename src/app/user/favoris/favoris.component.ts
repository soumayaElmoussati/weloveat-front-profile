import { Component,Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from './../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit {

  favorisList : any;
  currentPage: number = 1;

  constructor(

    private userS: UserService,
    private translocoS: TranslocoService,
    private tokenS: TokenService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.userS.currentLinkParam.next({ parent:3, child:0 });
    this.translocoS.selectTranslate('Your favorite restaurants', null).subscribe(value => this.userS.dataTitle.next(value));
    this.translocoS.selectTranslate('This is where you can manage all your favorite restaurants').subscribe(value => this.userS.dataSubTitle.next(value));
   }



  ngOnInit(): void {
    this.get();
  }


  get(){
    this.userS.getFavoris().subscribe(
 
      data => {
        this.favorisList = data.data;

        console.log('favorisList', data);
      },
      error => {
        console.log(error);
      }
    )

  }

  /*** */

 

}
