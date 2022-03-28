import { Component, OnInit ,Inject } from '@angular/core';
import { AdminEstablishmentService } from 'src/app/shared/services/admin-establishment.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-zone-geographique',
  templateUrl: './add-zone-geographique.component.html',
  styleUrls: ['./add-zone-geographique.component.scss']
})
export class AddZoneGeographiqueComponent implements OnInit {

  zoneGeographiqueForm = new FormGroup({
    id: new FormControl(''),
    geographic_name: new FormControl('', Validators.required),
    shipping_cost: new FormControl(''),
    free_delivery: new FormControl(),
    delivery_time: new FormControl(''),
    minimum_per_order: new FormControl(''),
    unit: new FormControl('')
  });

  timeUnitsList:any;

  constructor(
    private adminEstablishmentS: AdminEstablishmentService,
    public dialogRef: MatDialogRef<AddZoneGeographiqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getAllTimeunits();
  }

  getAllTimeunits(){
    this.adminEstablishmentS.getTimeUnits().subscribe(
      data => {
       this.timeUnitsList = data.data;
       
      },
      error => { },
      () => { }
    )
  }

  zoneGeographiqueFormSubmit(){}

  onConfirm(){
    this.dialogRef.close({
      confirm: true,
    });
  }

  onCancel(){
    this.dialogRef.close();
  }

}
