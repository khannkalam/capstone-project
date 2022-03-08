import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-addnewcompany',
  templateUrl: './addnewcompany.component.html',
  styleUrls: ['./addnewcompany.component.css']
})
export class AddnewcompanyComponent implements OnInit {

  companyRef = new FormGroup({
    company: new FormControl
  });

  result:string;
  error: boolean = false;

  constructor(public comService: CompanyService, private router:Router) { }

  ngOnInit(): void {
  }

    addNewCompany():void{
      if(this.companyRef.controls['company'].value == "")
      {
        this.error = true;
      }else{
        this.error = false;
        this.comService.addCompany(this.companyRef.value).subscribe(data=>{

          this.router.navigate(['/companies-list']);
          
        },
        (err) => {this.result = err});

      }
      
    }

    goBack():void{
      this.router.navigate(['/companies-list']);
    }


}
