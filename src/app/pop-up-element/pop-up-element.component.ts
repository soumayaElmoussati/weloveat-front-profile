import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pop-up-element',
  templateUrl: './pop-up-element.component.html',
  styleUrls: ['./pop-up-element.component.scss']
})
export class PopUpElementComponent implements OnInit {
  restauImgUrl = environment.restaurantImgUrl;

  slug: string;
  //type:'restaurant';

  constructor(
    private productS: ProductService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log('my data', this.data);
    
  }


  ngOnInit(): void {
  }

}
