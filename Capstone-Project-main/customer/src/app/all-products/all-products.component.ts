import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products:Product[];
  cart: any;
 

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
   this.loadProduct();
  }

  addToCart(index,id):void{

    this.cart = JSON.parse(localStorage.getItem('cart'));
    var dupIndx: number = 0;
    var dup:boolean = false;
    
    if(this.cart === null)
    {
      this.cart  = new Array();
      this.products[index].quantity = 1;
       this.cart.push(this.products[index]);
        
      
      localStorage.setItem('cart',JSON.stringify(this.cart));

    }
    else{

      for(var i = 0; i < this.cart.length; i++)
      {
       
        if(this.cart[i]._id === id)
        {
          dupIndx = i;
          dup = true;
          break;
         
          
        }
        
         
      }

      if(dup)
      {
        if(isNaN(this.cart[dupIndx].quantity)) this.cart[dupIndx].quantity = 1;
        this.cart[dupIndx].quantity++;
      }
      else{
        this.cart.push(this.products[index]);
      }
      
   
    localStorage.setItem('cart',JSON.stringify(this.cart));
      
     
        

    }

  }


  loadProduct():void{
    this.productService.getProducts().subscribe(data=>this.products=data);
  }

}
