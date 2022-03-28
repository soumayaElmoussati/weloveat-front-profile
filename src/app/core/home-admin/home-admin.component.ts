import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  currentLink = { parrent: 0, child : 0};
  isExpanded : boolean = true;
  pageTitle: string;
  pageSubTitle: string;
  backTo: string;
  subMenu = 0;
  showSubMenu = false;
  
  constructor(
    private adminS: AdminService
  ) { }

  ngOnInit(): void {

    this.adminS.currentLinkParam.subscribe( data => this.currentLink = data );
    this.adminS.currentdataTitle.subscribe( data => this.pageTitle = data );
    this.adminS.currentdataSubTitle.subscribe( data => this.pageSubTitle = data );

  }

}
