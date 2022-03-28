import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  @Input() restaurant;
  restauImgUrl = environment.restaurantImgUrl;

  constructor(private userS: UserService) { }

  ngOnInit(): void {

  }

  addFavoris(){

    const data = {
      id: this.restaurant.id,
      type: this.restaurant.type
    }
    this.userS.follow(data).subscribe(
      data => {
        this.restaurant.favorite = data.favorite;
      },
      error => {},
      () => {}
    )
  
}

}
