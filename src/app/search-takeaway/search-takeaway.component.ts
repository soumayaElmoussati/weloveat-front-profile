import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { RestaurantDetailComponent } from '../restaurant-detail/restaurant-detail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-takeaway',
  templateUrl: './search-takeaway.component.html',
  styleUrls: ['./search-takeaway.component.scss']
})
export class SearchTakeawayComponent implements OnInit {

  catRestauImgUrl = environment.catRestaurantImgUrl;
  triFood= new FormControl('');
  triFoods= [{
    value: '',
    name: 'Choisi pour vous (par défaut)'
  },
  {
    value: 'score',
    name: 'Les mieux notés'

  },
  {
    value:  'delivery_time',
    name: 'Délais de livraison plus courts'

  }
  ];
  triReservation= new FormControl('');
  triReservations= [{
    value: 'distance',
    name: 'Distance'
  },
  {
    value: 'favorites',
    name: 'Mes favoris'

  },
  {
    value:  'score',
    name: 'Mes favoris'

  }
  ];


  score = new FormControl('');
  orderFood = new FormControl('');

  orderFoods = [{
    value: 10,
    name: '10€ ou moins'
  },
  {
    value: 15,
    name: '15€ ou moins'

  }
  ];



  dietetics = [];
  restaurantAdvantages=[];
  category: any;

  
  receptionType;
  
  receptions = [{
    id: 1,
    name: 'Livraison'
  },
  {
    id: 2,
    name: 'À Emporter'
  }
  ];
  restaurantAdvantagesList: [] ;
  dieteticsList: any;
  categoriesList: any;
  restaurantList: any;
  currentPage = 1;
  lastPage = 0;
  perPage = 12;
  type: string = "restaurant";
  date:Date;
  time:number;
  constructor(
    private productS: ProductService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe( param => {
      this.type = param.type;
      //this.date = param.date;
    } )
  }

  ngOnInit(): void {

    this.orderFood.valueChanges.subscribe(data => { this.getRestaurants() })
    this.score.valueChanges.subscribe(data => { this.getRestaurants() })

    this.getCategories();
    this.getRestaurants();
    this.getDietetics();
    this.getRestaurantAdvantages();
//    this.lastPage = obj.meta.last_page;


  }
  getCollection(index): any {
    let array = [];    
    const pagesBefore = this.currentPage - 1;
    const pagesAfter = index - this.currentPage;
    if(index <= 4){
      for (let i = 1; i <= index; i++) {
        array.push(i);
      }
      return array;
    }
    if (pagesBefore < 2) {
      if(this.currentPage != 1) array.push(1);
      array.push(this.currentPage);
      array.push(this.currentPage + 1);
      array.push(this.currentPage + 2);
      array.push(index);
    } else if (pagesAfter < 2) {
      array.push(1);
      array.push(this.currentPage - 2);
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
      if(this.currentPage != index) array.push(index);
    } else {
      array.push(1);
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
      array.push(this.currentPage + 1);
      array.push(index);
    }
    if((array[1] - 1) > 1) array.splice(1, 0, '...');
    if((index - array[array.length - 2]) > 1) array.splice(array.length-1, 0, '...');
    return array;
  }
  navigateTo(page) {
    this.currentPage = page;
    this.getRestaurants();
  }

  getRestaurants() {
    const data = {
      advantages:this.restaurantAdvantagesList,
      type: this.type,
      // triFood : this.triFood,
      score: this.score.value,
      dietetics: this.dietetics,
      category: this.category,
      receptionType: this.receptionType,
      min_per_order: this.orderFood.value,
      order:this.triFood.value,
      arrangement:this.triReservation.value,
      perPage: this.perPage,
      currentPage: this.currentPage,
      date:this.date,
      time:this.time,

      //date/heure/ 
    };

    this.productS.getRestaurants(data).subscribe(
      data => {
        this.restaurantList = data.data;
        this.lastPage = data.last_page;
        console.log('reastauraanttttss', data);
      },
      error => {
        console.log(error);
      }

    )

  }
  getRestaurantAdvantages() {
    this.productS.getRestaurantAdvantages().subscribe(
      data => {
        this.restaurantAdvantagesList = data.data;
        console.log('restaurantAvantage',data);
      },
      error => {
        console.log(error);
      }

    )
  }


  getDietetics() {
    this.productS.getDietetics().subscribe(
      data => {
        this.dieteticsList = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  getCategories() {

    const data = {
      type: this.type,
    }
    this.productS.getCategories(data).subscribe(
      data => {
        this.categoriesList = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }
  onRestauReservation(element) {
    const index = this.restaurantAdvantages.findIndex(el => el == element);
    if (index < 0) {
      this.restaurantAdvantages.push(element);
    } else {
      this.restaurantAdvantages.splice(index, 1);
    }
    this.getRestaurants();
  }

  onDieteticClick(element) {
    const index = this.dietetics.findIndex(el => el == element);
    if (index < 0) {
      this.dietetics.push(element);
    } else {
      this.dietetics.splice(index, 1);
    }
    this.getRestaurants();
  }

  isSelected(element) {
    const index = this.dietetics.findIndex(el => el == element);
    if (index < 0) {
      return false;
    } else {
      return true;
    }
  }

  onRestauCategoryChange(cat) {
    if (cat == this.category) {
      this.category = null;
    }
    else {
      this.category = cat;
    }
    this.getRestaurants();


  }
  //   onReceptionTypeChange(recep){
  //     if(recep == this.receptions){
  //       this.receptionType = 1;
  //     }
  //     else {
  //       this.receptionType = 2;
  //     }
  //     this.getRestaurants();


  //   }
  // }


  onReceptionTypeChange(id) {
    console.log('event', id);
    this.receptionType = id;
    this.getRestaurants();
  }
}
