import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminEstablishmentService } from 'src/app/shared/services/admin-establishment.service';
import { MatDialog } from '@angular/material/dialog';
import { AddZoneGeographiqueComponent } from '../establishment-admin/add-zone-geographique/add-zone-geographique.component';
import { ConfirmationDeleteDeliveryZoneComponent } from './confirmation-delete-delivery-zone/confirmation-delete-delivery-zone.component';

@Component({
  selector: 'app-establishment-admin',
  templateUrl: './establishment-admin.component.html',
  styleUrls: ['./establishment-admin.component.scss']
})
export class EstablishmentAdminComponent implements OnInit {

  receptionTypeList: any;
  deliveryZonesList: any;
  horaireOuvertureList: any;
  establishmentDetail: any;

  establishmentForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl(''),
    description: new FormControl('', Validators.required),
    web_site: new FormControl('')
  });

  deliveryZonesForm = new FormGroup({
    id: new FormControl(''),
    geographic_name: new FormControl('', Validators.required),
    delivery_time: new FormControl(''),
    free_delivery: new FormControl('', Validators.required),
    shipping_cost: new FormControl(''),
    minimum_per_order: new FormControl('')
  });

  horaireOuvertureForm = new FormGroup({
    id: new FormControl(''),
    day: new FormControl(''),
    morning_end_time: new FormControl(''),
    morning_start_time: new FormControl(''),
    evening_start_time: new FormControl(''),
    evening_end_time: new FormControl('')
  });


  livraisonOuvertureForm = new FormGroup({
    id: new FormControl(''),
    day: new FormControl(''),
    morning_end_time: new FormControl(''),
    morning_start_time: new FormControl(''),
    evening_start_time: new FormControl(''),
    evening_end_time: new FormControl('')
  });

  yourEstablishmentForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });

  receptionType = new FormControl();

  constructor(
    private adminEstablishmentS: AdminEstablishmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEstablishment();
    this.getReceptionType();
    this.getDeliveryZones();
    this.getEstablishmentDetails();
    this.receptionType.valueChanges.subscribe( data => this.updateReceptionType() );
  }

  getEstablishment(){
    this.adminEstablishmentS.getEstablishment().subscribe(
      data => {
        console.log('establishment',data);
        this.establishmentForm.patchValue(data.data);
      },
      error => { },
      () => { }
    )
  }

  getEstablishmentDetails(){
    this.adminEstablishmentS.getEstablishment().subscribe(
      data => { 
        this.establishmentDetail = data.data;
        console.log('establishment details',data);
       },
      error => {},
      () => {}
    )
  }

  establishmentFormSubmit() {
    console.log(this.establishmentForm.value);
    this.adminEstablishmentS.updateEstablishment(this.establishmentForm.value).subscribe((res: any) => {
      console.log('Company updated successfully!');
    })
  }

  updateyYourEstablishment() {
    this.adminEstablishmentS.updateReceptionTypes(this.yourEstablishmentForm.value).subscribe((res: any) => {
      console.log('Your establishment updated successfully!');
    })
  }

  getReceptionType(){
    this.adminEstablishmentS.getReceptionTypes().subscribe(
      data => {
        console.log(data);
       this.receptionTypeList = data.data;
      },
      error => { },
      () => { }
    )
  }
  updateReceptionType(){}


  getDeliveryZones(){
    this.adminEstablishmentS.getDeliveryZones().subscribe(
      data => {
        console.log('delivery zone',data);
       this.deliveryZonesList = data.data;
      },
      error => { },
      () => { }
    )
  }

  //

  deleteZoneDelivery(el){
    const dialog = this.dialog.open( ConfirmationDeleteDeliveryZoneComponent, {
      data : {
        data : el,
        title: 'Etes-vous sûr de vouloir supprimer cette zone de livraison?',
        content: 'Cette zone de livraison sera supprimée définitivement. Êtes-vous sûr de vouloir la supprimer?',
        confirmBtn: 'Oui',
        cancelBtn: 'Annuler' 
      },
        width: '700px',
     // height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.adminEstablishmentS.deleteDeliveryZone(el.id).subscribe(
          data => {
            this.deliveryZonesList.data;
            this.getDeliveryZones();

          }
        )
      }
    })

  }




  //
  addZoneDelivery(){
    const dialog = this.dialog.open(AddZoneGeographiqueComponent, {
     
    });

     dialog.afterClosed().subscribe(data => {
         this.deliveryZonesList.data;
         this.getDeliveryZones();
    })


    
  }

  zoneDeliveryFormSubmit() {

        console.log(this.deliveryZonesForm.value);
        this.adminEstablishmentS.addDeliveryZone(this.deliveryZonesForm.value).subscribe((res: any) => {
        //  this.dialogRef.close(res.data);
        })
      

  }

}
