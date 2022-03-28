import { Component, OnInit } from '@angular/core';
import { ReservationsSettingService } from 'src/app/shared/services/reservations-setting.service';

@Component({
  selector: 'app-reservations-settings',
  templateUrl: './reservations-settings.component.html',
  styleUrls: ['./reservations-settings.component.scss']
})
export class ReservationsSettingsComponent implements OnInit {

  reservationsList : any;

  constructor(
    private reservationsSettingS:ReservationsSettingService
  ) { }

  ngOnInit(): void {
    this.getReservationsPlaces();
  }

  getReservationsPlaces(){
 
    this.reservationsSettingS.getReservationPlaces().subscribe(
      data => {
        this.reservationsList = data.data;
        console.log(data);

      }
    )
  }

}
