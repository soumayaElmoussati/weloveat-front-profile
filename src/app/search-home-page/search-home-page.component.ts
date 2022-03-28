import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router'; 
import { environment } from 'src/environments/environment';
import { CartService } from '../shared/services/cart.service';
import { ProductService } from '../shared/services/product.service';
import { TokenService } from '../shared/services/token.service';


@Component({
  selector: 'app-search-home-page',
  templateUrl: './search-home-page.component.html',
  styleUrls: ['./search-home-page.component.scss']
})
export class SearchHomePageComponent implements OnInit {
  restauImgUrl = environment.restaurantImgUrl;
  popularRestaurantList:any;
  restaurantList: any;
  catRestauImgUrl = environment.catRestaurantImgUrl;
  categoryList: any;
  type: string = "restaurant";
  date:string="date";
  
  searchForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    type: new FormControl('Livraison', [Validators.required]),
    date: new FormControl('', [Validators.required])
  })


  isConnected: boolean;


  // types = [
  //   { value: 0, name: 'Livraison'},
  //   { value: 1, name: 'A emporter'}
  // ]
  receptionType =1;
  receptions = [{
    id: 1,
    name: 'Livraison'
  },
  {
    id: 2,
    name: 'À Emporter'
  }
  ];
  selectedType= this.receptions[0].id;
  
  categoriesList = [
    {
      id: 0,
      title: 'caegorie 1',
      image: 'sushi-png.svg',
    },
    {
      id: 1,
      title: 'caegorie 2',
      image: 'sushi-png.svg',
    },
    {
      id: 2,
      title: 'caegorie 3',
      image: 'sushi-png.svg',
    },
    {
      id: 3,
      title: 'caegorie 4',
      image: 'sushi-png.svg',
    },
    {
      id: 4,
      title: 'caegorie 5',
      image: 'sushi-png.svg',
    },
    {
      id: 5,
      title: 'caegorie 6',
      image: 'sushi-png.svg',
    },
  ]

  constructor(
    private productS: ProductService,
    private cartS: CartService,
    private tokenS: TokenService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.isConnected = this.tokenS.getToken();
    this.route.queryParams.subscribe( param => this.type = param.type );
 
  }

  ngOnInit(): void {
    this.getPopularCategories();
    this.getRestaurants();
    this.getPopularRestaurants();
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  
  getPopularRestaurants(){
    this.productS.getPopularRestaurants().subscribe(
      data => {
        this.popularRestaurantList = data.data;
        console.log('restaurant populaire', data)
      },
      error => {
        console.log(error);
      }
    )
  }
  getPopularCategories() {
    const data = {
      type: this.type,
    }
    this.productS.getPopularCategories(data).subscribe(
      data => {
        this.categoryList = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }
  getRestaurants() {
    const data = {
      type: this.type,
      receptionType: this.receptionType,
      date:this.searchForm.value.date,
    }

    this.productS.getRestaurants(data).subscribe(
      data => {
        this.restaurantList = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  onSearchFormSubmit(){
    if(this.searchForm.valid){
      console.log( this.searchForm.value )
     
      this.getRestaurants();
    }
    
  }
  onReceptionTypeChange(id) {
    console.log('event', id);
    this.receptionType = id;
   // this.getRestaurants();
    this.cartS.addRecep(id);
  }

  goToLogin(){
    this.router.navigateByUrl('/login?redirectTo='+this.router.url);
  }
 


}
