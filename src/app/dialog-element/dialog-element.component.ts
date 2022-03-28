import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { CartService } from '../shared/services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-element',
  templateUrl: './dialog-element.component.html',
  styleUrls: ['./dialog-element.component.scss']
})
export class DialogElementComponent implements OnInit {
  ingredient:string;
  ProdImgUrl = environment.productImgUrl;
  cart: any = [];
  comment: string; 
  orderFood = new FormControl('');
  products: any;
  slug: string;
  categories: any;
  pro: any;
  item =[];
  price: number = this.data.product.price;
  increment: number = 1;


  constructor(
    private productS: ProductService,
    private cartS: CartService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log('my data', this.data);
  }

  ngOnInit(): void {
    this.data.product.additional_categories.forEach(element => {
      this.item.push({ name: element.name, value: [] });
    });
    this.item.push({ name: 'custom', value: [] });
    console.log(this.item);
    //this.getDetailProducts();
  }

  addToItem(annexe, category, multi_select) {
    let index = this.item.findIndex(element => element.name == category);
    if (multi_select) {
      let indexA = this.item[index].value.findIndex(element => element.name == annexe.name);
      if (indexA < 0) {
        this.item[index].value.push(annexe);
      }
      else {
        this.item[index].value.splice(indexA, 1);
      }

    }
    else {
      this.item[index].value = [];
      this.item[index].value.push(annexe);
    }
    console.log(this.item);
    this.countPrice();
  }

  isSelected(annexe, category, multi_select) {
    let index = this.item.findIndex(element => element.name == category);
    if (multi_select) {
      let indexA = this.item[index].value.findIndex(element => element.name == annexe.name);
      if (indexA < 0) {
        return false;
      }
      else {
       return true;
      }

    }
    //else {
    //   this.item[index].value = [];
    //   this.item[index].value.push(annexe);
    // }
    // console.log(this.item);
    // this.countPrice();

  }



  countPrice() {
    this.price = this.data.product.price;
   
    this.item.forEach(item => {
      item.value.forEach(element => { 
        if(element.price){
        this.price += element.price;
      }
      });
   } );


  }
  // isSelected(element) {
  //   const index = this..findIndex(el => el == element);
  //   if (index < 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  incrementQte() {
    this.increment++;
  }
  decrementQte() {
    if (this.increment > 1)
      this.increment--;
    else
      this.increment == 1;
  } 

  addProduct(){
    const items = {
      product: {
        id: this.data.product.id,
        name: this.data.product.name,
        picture: this.data.product.picture,
      },
      annexe: this.item,
      quantity: this.increment,
      price: this.price,
      comment:this.comment,
    }
       
    this.cartS.addToCart(items, this.data.restaurant);
    
  }

  
}
