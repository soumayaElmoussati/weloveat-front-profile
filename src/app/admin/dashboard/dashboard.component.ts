import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { FormControl } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AdminProfileService } from 'src/app/shared/services/admin-profile.service';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  chartReady = true;
  filtre = new FormControl('month');
  currentPage = 1;
  perPage = 200;

  statisticsData = {
    nbrNewOrders:'',
    nbrPendingOrders:'',
    nbrDeliveredOrders: '',
    nbrReservationRequests: '',
    personsNbr: ''
  }
  public barChartLabels = [];
  public dataOrders = [];
  public barChartData = [];
  public barChartLegend = true;
  public barChartType = 'bar';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: "bottom",
    }
  };

  establishment : any;
  restauImgUrl = environment.restaurantImgUrl;
  coverImagePath: any;
  coverImageProgress = 0;

  constructor(
    private translocoS: TranslocoService,
    private adminS: AdminService,
    private adminProfileS: AdminProfileService
  ) { 
       this.translocoS.selectTranslate('HAPPY_TO_SEE_YOU_AGAIN', null).subscribe(value => this.adminS.dataTitle.next(value));
       this.translocoS.selectTranslate('Welcome to your management space').subscribe(value => this.adminS.dataSubTitle.next(value));
       this.adminS.dataBackTo.next(null);
       this.adminS.currentLinkParam.next({ parent:1, child:0 });
  }

  ngOnInit(): void {
    this.getChartData();
    this.getStatistics();
    this.getAdminProfile();
  }

  formatDate(data): string{
    const date = data.split('-');
    return date[2] + ' ' + this.translocoS.translate('MONTH_'+date[1])  + ' ' + date[0];
  }

  formatDateMonth(data): string{
    const date = data.split('-');
    return this.translocoS.translate('MONTH_'+date[0])  + ' ' + date[1];
  }

  getChartData(){
    this.adminS.getChartData(this.filtre.value).subscribe(
      data => {

        this.dataOrders = data.amounts;
        this.barChartLabels = [];
        if(this.filtre.value == 'day'){
          data.interval.forEach(element => {
            this.barChartLabels.push( this.formatDate(element) )
          });
        }else if(this.filtre.value == 'month'){
          data.interval.forEach(element => {
            this.barChartLabels.push( this.formatDateMonth(element) )
          });
        }else{
          this.barChartLabels = data.interval;
        }
          this.generateChart();
          console.log('test chart', data);
      }
    )
  }

  //

  
  generateChart(){
  
    this.barChartData = [
   
      {
        data: this.dataOrders,
        type:'line',
        label: 'Commandes',
        fill: true,
        borderColor: '#58C6FA',
        borderDash: [5,5]
      }
    ];

  }

  //

  getStatistics(){
    this.adminS.getStatistics().subscribe(
      data => { 
        this.statisticsData = data ;
        console.log('statistique',data);
      }
    )
  }

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
