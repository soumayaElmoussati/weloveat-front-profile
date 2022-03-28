import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {

  currentLink = { parrent: 0, child : 0}; 
  isExpanded : boolean = true;
  pageTitle: string;
  pageSubTitle: string;
  constructor(
    private userS: UserService,
    private router: Router,
    private tokenS: TokenService
  ) { }

  ngOnInit(): void {

    this.userS.currentLinkParam.subscribe( data => this.currentLink = data );
    this.userS.currentdataTitle.subscribe( data => this.pageTitle = data );
    this.userS.currentdataSubTitle.subscribe( data => this.pageSubTitle = data );
  }

  logOut(){
    this.tokenS.remove();
    this.router.navigateByUrl('/login');
  }

}
