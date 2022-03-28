import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ReservationAdminService } from 'src/app/shared/services/reservation-admin.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationAcceptReservationComponent } from './confirmation-accept-reservation/confirmation-accept-reservation.component';
import { ConfirmationRefuseReservationComponent } from './confirmation-refuse-reservation/confirmation-refuse-reservation.component';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.scss']
})
export class ReservationsAdminComponent implements OnInit {

  currentPage: number = 1;
  lastPage = 0;
  reservationsList : any;
  requestsList : any;
  perPage: number = 10;
  dateReservation = new FormControl();

  constructor(
    private adminS: AdminService,
    private reservationAdminS: ReservationAdminService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private translocoS: TranslocoService
  ) {
       
      this.translocoS.selectTranslate('YOUR_RESERVATIONS', null).subscribe(value => this.adminS.dataTitle.next(value));
      this.translocoS.selectTranslate('Welcome to your management space').subscribe(value => this.adminS.dataSubTitle.next(value));

   }

  ngOnInit(): void {

    this.adminS.currentLinkParam.next({ parent:4, child:0 });
    this.getRequests();
    this.getReservations();
    this.dateReservation.valueChanges.subscribe( data => this.getReservations() );
  }

  getRequests(){
    this.reservationAdminS.getRequests().subscribe(
      data => {
        this.requestsList = data.data;
       // console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  //

  getReservations(){
    const data = {
      perPage: this.perPage,
      date: this.datePipe.transform(this.dateReservation.value, 'dd-MM-yyyy' )
    };
    this.reservationAdminS.getAcceptedReservations(data, this.currentPage).subscribe(
      data => {
        this.reservationsList = data.data;
        console.log(data);

      }
    )
  }
  ///

  acceptReservation(el){
    const dialog = this.dialog.open( ConfirmationAcceptReservationComponent, {
      data : {
        data : el,
        title: 'Vous êtes sur le point d’accepter cette réservation:',
        confirmBtn: 'Confirmer',
        cancelBtn: 'Annuler' 
      },
        width: '700px',
     // height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.reservationAdminS.confirmAcceptReservation(el.id).subscribe(
          data => {
            this.reservationsList.data;
            this.getRequests();

          }
        )
      }
    })

  }

  //

  refuseReservation(el){
    const dialog = this.dialog.open( ConfirmationRefuseReservationComponent, {
      data : {
        data : el,
        content: 'Vous n’avez plus de place pour cette date. Impossible d’accepter cette réservation',
        confirmBtn: 'J’ai compris'
      },
        width: '700px',
     // height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.reservationAdminS.confirmRefuseReservation(el.id).subscribe(
          data => {
            this.reservationsList.data;
            this.getRequests();
          }
        )
      }
    })

  }


}
