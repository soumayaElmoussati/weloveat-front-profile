import { ViewportScroller } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementComponent } from '../dialog-element/dialog-element.component';

import { PopUpElementComponent } from '../pop-up-element/pop-up-element.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {

  restauImgUrl = environment.restaurantImgUrl;
  ProdImgUrl = environment.productImgUrl;
  slug: string;
  receptionType = 1;
  receptions = [{
    id: 1,
    name: 'Livraison'
  },
  {
    id: 2,
    name: 'À Emporter'
  }
  ];
  categoories = [{
    id: 1,
    name: 'menu',
    menuFoods : [{
      id: 1,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 2,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 3,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 4,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 5,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    }
    ]
  },
  {
    id: 2,
    name: 'A Menus enfants',
    menuFoods : [{
      id: 1,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 2,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 3,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 4,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 5,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    }
    ]
  },
  {
    id: 3,
    name: 'menu', 
    menuFoods : [{
      id: 1,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 2,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 3,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 4,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    },
    {
      id: 5,
      name: 'Grillades à la brézilienne',
      description:'Brochettes d’agneau accompagnées de salade, de légumes poelées et de sauce au poivre',
      price:'21,00€',
      imageUrl:'menuFood.svg',
    }
    ]
  },
  {
    id: 4,
    name: 'A Menus enfants'
  },
  {
    id: 5,
    name: 'menu'
  },
  {
    id: 6,
    name: 'A Menus enfants'
  },
  {
    id: 7,
    name: 'menu'
  },
  {
    id: 8,
    name: 'A Menus enfants'
  }
  ];
  category: any;
  restaurant : any;
  type : string ="restaurant";

//  restauList:any;
//  establishmentList: any;

//  establishment=[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productS: ProductService,
    private viewportSroller: ViewportScroller,
  ) {
    this.route.paramMap.subscribe(
      params => this.slug = params.get('slug')
    )
    this.route.queryParams.subscribe( param => this.type = param.type );
  }

  ngOnInit(): void {
    this.getFoundEstablishmentProducts();
    
    //this.getRestau();
    ///this.getEstablishment();

    
  }

  getRestauDetail(){
    
    this.productS.getRestaurant(this.slug).subscribe(
      data => { console.log(data); this.restaurant = data.data },
      error => {},
      () => {
        this.getFoundEstablishmentProducts();
      }
    )

    //code
  }

  /*
  getDisplayedProductCategories(){
    const data = {
      id : this.restaurant.id,
      restaurant : 'restaurant'
    };
    this.productS.getDisplayedProductCategories(data).subscribe(
      data => { console.log('getDisplayedProductCategories', data);  }
    )
*/
getFoundEstablishmentProducts(){
  const data = {
    slug : this.slug,
    type : this.type,
  };
  // this.productS.getFoundEstablishmentProducts(data).subscribe(
  //   data => { console.log('getFoundEstablishmentProducts', data);
  //             this.categoories = data.data  }
  // )
  this.productS.getFoundEstablishmentProducts(data).subscribe(
    data => { 
      console.log('getFoundEstablishmentProducts', data);
      this.categoories = data.results;
      this.restaurant = data.establishment
    }
  )
}
  getRestaurantDetail(){
    const data = {
      slug : this.slug,
      type : this.type,
    };
    this.productS.getRestaurantDetail(data).subscribe(
      data => { 
        console.log('getRestaurantDetail', data);
      }
    )

  }

  scroll(el){ 
    console.log(el);
    this.viewportSroller.scrollToAnchor('cat_'+el);
  }

  openDialog(slug) {

    this.productS.getDetailProducts(slug).subscribe(
      data => {
        let dialogRef = this.dialog.open(DialogElementComponent, {
          width: '750px',
          //margin:'0px',
          data :{
            product :  data.data,
            restaurant: this.restaurant
          },
          panelClass:'dialogwelov'
        });
      }
    )

    
  }
  openPopUp(slug) {
    const data = {
      slug : this.slug,
      type : this.type,
    };
    this.productS.getRestaurantDetail(data).subscribe(
      data => {
        let dialogRef =  this.dialog.open(PopUpElementComponent,{
      width: '750px',
      data : data.data ,
      
    });

  }
    )
}
}
