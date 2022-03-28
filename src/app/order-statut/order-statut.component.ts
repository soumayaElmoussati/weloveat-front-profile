import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-statut',
  templateUrl: './order-statut.component.html',
  styleUrls: ['./order-statut.component.scss']
})
export class OrderStatutComponent implements OnInit {

  paymentStatus = true;

  constructor() { }

  ngOnInit(): void {
  }

}
