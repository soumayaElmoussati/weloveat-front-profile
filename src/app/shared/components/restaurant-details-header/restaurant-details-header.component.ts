import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PopUpElementComponent } from 'src/app/pop-up-element/pop-up-element.component';
import { environment } from 'src/environments/environment';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-restaurant-details-header',
  templateUrl: './restaurant-details-header.component.html',
  styleUrls: ['./restaurant-details-header.component.scss']
})
export class RestaurantDetailsHeaderComponent implements OnInit {
  type:string="restaurant";
  slug: string;
  restauImgUrl = environment.restaurantImgUrl;
  @Input() restaurant;
  constructor(
    public dialog: MatDialog,
    private productS: ProductService,
    private route: ActivatedRoute
    //public cartS: CartService
  ) {
    this.route.queryParams.subscribe( param => this.type = param.type )
    //this.restaurant = this.cartS.getCart().restaurant;
  }

  ngOnInit(): void {
  }


  openPopUp() {
    const data = {
      slug: this.restaurant.slug,
      type: this.type
    };
    this.productS.getRestaurantDetail(data).subscribe(
      data => {
        let dialogRef = this.dialog.open(PopUpElementComponent, {
          width: '750px',
          data: data.data,
        });

      }
    )
  }
}
