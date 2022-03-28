import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from './../../shared/services/user.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-loyality-points',
  templateUrl: './loyality-points.component.html',
  styleUrls: ['./loyality-points.component.scss']
})
export class LoyalityPointsComponent implements OnInit {

  loyalty_points : any;
  currentPage: number = 1;

  constructor(
    private userS: UserService,
    private translocoS: TranslocoService,
    private tokenS: TokenService
  ) { 
    this.userS.currentLinkParam.next({ parent:5, child:0 });
    this.translocoS.selectTranslate('Your loyalty points', null).subscribe(value => this.userS.dataTitle.next(value));
    this.translocoS.selectTranslate('This is where you can manage your loyalty points').subscribe(value => this.userS.dataSubTitle.next(value));
  }

  ngOnInit(): void {
    this.getLoyaltyPoints();
  }
   
  getLoyaltyPoints(){
    this.userS.getLoyaltyPoint().subscribe(
 
      data => {
        this.loyalty_points = data;
     //  console.log(data);
      },
      error => {
        console.log(error);
      }
    )

  }

}
