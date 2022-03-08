import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  total: number = 0;
  formData: any = {};
  errors: any = [];
  cartDiv: boolean = true;
  checkoutDiv : boolean = false;

  checkoutF = new FormGroup({
    fullname: new FormControl(),
    email: new FormControl(),
    address : new FormControl(),
    city : new FormControl(),
    state : new FormControl(),
    zipcode: new FormControl(),
    nameOnCard : new FormControl(),
    ccnumber : new FormControl(),
    expmonth : new FormControl(),
    expyear : new FormControl(),
    cvv: new FormControl()

  });

  constructor() { }

  ngOnInit(): void {
    this.loadCart();
  }

  delete(index):void{

      this.total -= this.cart[index].price;
     this.cart.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.ngOnInit();

  }

  loadCart():void{
    this.total = 0;
    let price : number = 0;
    this.cart = JSON.parse(localStorage.getItem('cart'));
    for(var l of this.cart)
    {
      price = l.price*l.quantity;
      this.total += price;
    }
    //console.log(this.total);
  }

  updateQuantity(event,id):void{
    
    this.cart[id].quantity = event.target.value;
    localStorage.setItem('cart',JSON.stringify(this.cart));

    this.ngOnInit();

  }

  checkoutCart():void{
    this.cartDiv = false;
    this.checkoutDiv = true;
  }

}
