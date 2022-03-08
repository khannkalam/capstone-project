import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./addnewproduct.component.css']
})
export class AddnewproductComponent implements OnInit {

  productRef = new FormGroup({
    name: new FormControl('',{
      validators: Validators.required
    }
      
    ),
    description: new FormControl('',{
      validators: Validators.required
    }
      
    ),
    company:new FormControl('',{
      validators: Validators.required
    }
      
    ),
    image:new FormControl('',{
      validators: Validators.required
    }
      
    ),
    price: new FormControl('',{
      validators: Validators.required
    }
      
    ),
  });

  result: string;

  companies:Company[];

  constructor(private companyService: CompanyService, private productService: ProductService ,private router: Router) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data=>this.companies=data);
  }


  addNewProduct():void{
    if(this.productRef.valid)
    {
      this.productService.addProduct(this.productRef.value).subscribe(data=>{

        this.router.navigate(['/products']);
        
      },
      (err) => {this.result = err});
    }
   
  }

  goBack():void{
    this.router.navigate(['/products']);
  }


}


