import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AdminService } from 'src/app/shared/services/admin.service';
import { EvaluationsAdminService } from 'src/app/shared/services/evaluations-admin.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {

  UserImgUrl = environment.userImgUrl;
  currentPage: number = 1;
  perPage: number = 10;
  evaluationList: any;
  score : any;

  constructor(
    private adminS: AdminService,
    private translocoS: TranslocoService,
    private evaluationS: EvaluationsAdminService
  ) { 
         this.translocoS.selectTranslate('YOUR_EVALUATIONS', null).subscribe(value => this.adminS.dataTitle.next(value));
         this.translocoS.selectTranslate('WELCOME_TO_YOUR_MANAGEMENT_SPACE').subscribe(value => this.adminS.dataSubTitle.next(value));
  }

  ngOnInit(): void {
    this.adminS.currentLinkParam.next({ parent:6, child:0 });
    this.getEvaluations();
    this.getEstablishmentScores();
  }


  getEvaluations(){
 
    this.evaluationS.getEvaluations(this.perPage).subscribe(
      data => {
        this.evaluationList = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  //


  getEstablishmentScores(){
 
    this.evaluationS.getEstablishmentScore().subscribe(
      data => {
        this.score = data.score
        console.log('Establishment score',data);
      },
      error => {
        console.log(error);
      }
    )
  }


}
