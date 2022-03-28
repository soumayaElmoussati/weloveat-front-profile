import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  type:string='restaurant';
  totalItems:number = 0;

  constructor(
    private cartS: CartService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe( param => this.type = param.type )
  }

  ngOnInit(): void {
    this.cartS.currentTotalItems.subscribe(
      data => this.totalItems = data,
    )
  }

}
