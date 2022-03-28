import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  @Input() receptions;

  @Output() public myEvent = new EventEmitter();

  totalItems:number = 0;
  receptionType: number;
  type:string;
  searchForm = new FormGroup({
    address: new FormControl(),
    type: new FormControl(), 
  });

  constructor(
    private cartS: CartService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe( param => this.type = param.type )
  }

  ngOnInit(): void {
    this.currentReceptionType();
    this.cartS.currentTotalItems.subscribe(
      data => this.totalItems = data,
    )
  }

  onReceptionTypeChange(event) {
    this.myEvent.emit(event);
    this.cartS.addRecep(event);
    this.receptionType = event; 
  }

  currentReceptionType(){
    this.receptionType = this.cartS.getCart().reception_type; 
  }


}

