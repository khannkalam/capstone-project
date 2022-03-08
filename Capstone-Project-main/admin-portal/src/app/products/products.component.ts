import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  editProductDiv: boolean;
  ListProductDiv: boolean = true;
  selectedProductID: string;
  selectedCompany : string;

  productRef = new FormGroup({
    name: new FormControl,
    description: new FormControl,
    company: new FormControl,
    image: new FormControl,
    price: new FormControl
  });
  companies:Company[];
 

  constructor(private productService: ProductService, private companyService: CompanyService ,private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>
      this.products=data);
      this.companyService.getCompanies().subscribe(data=>this.companies=data);
    
  }

  addNewProduct():void{
    this.router.navigate(['/addnewproduct']);
  }

  deleteProduct(index):void{
    this.productService.deleteProductById(this.products[index]._id).subscribe(data=>console.log(data));
    location.reload();
  }
  editProduct(index){
    this.ListProductDiv = false;
    this.editProductDiv = true;
    this.productRef.controls['name'].setValue(this.products[index].name);
    this.productRef.controls['description'].setValue(this.products[index].description);
    this.productRef.controls['image'].setValue(this.products[index].image);
    this.productRef.controls['price'].setValue(this.products[index].price);
    this.selectedCompany = this.products[index].company['company'];
    this.selectedProductID = this.products[index]._id;
    console.log(this.selectedCompany);
  }

  updateProduct(index):void{

    this.productService.updateProductById(this.productRef.value, this.selectedProductID).subscribe(data=>console.log(data));
    location.reload();
    this.ListProductDiv = true;
    this.editProductDiv = false;


  }

  goBack():void{
    this.ListProductDiv = true;
    this.editProductDiv = false;
    this.productRef.reset();

  }
  

}
