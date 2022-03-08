import { CompanyService } from './../services/company.service';
import { Company } from './../models/company';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  companies: Company[];
  editCompanyDiv: boolean;
  ListCompanyDiv: boolean = true;
  slectedCompanyID: string;

  companyRef = new FormGroup({
    company: new FormControl
  });
 

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
     
    })
  }

  addNewCompany():void{
    this.router.navigate(['/addnewcompany']);
  }

  deleteCompany(index):void{
    this.companyService.deleteCompanyById(this.companies[index]._id).subscribe(data=>console.log(data));
    location.reload();
  }

  editCompany(index):void{
    this.ListCompanyDiv = false;
    this.editCompanyDiv = true;
    //this.companyRef.setValue(this.companies[index].company);
    this.companyRef.controls['company'].setValue(this.companies[index].company);
    this.slectedCompanyID = this.companies[index]._id;

  }

  updateCompany(index):void{

    this.companyService.updateCompanyById(this.companyRef.value, this.slectedCompanyID).subscribe(data=>console.log(data));
    location.reload();
    this.ListCompanyDiv = true;
    this.editCompanyDiv = false;

  }

}
