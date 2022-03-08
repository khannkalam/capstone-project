import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthModule } from './auth/auth.module';
import { ServicesComponent } from './services/services.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { ProductsComponent } from './products/products.component';
import { AddnewcompanyComponent } from './addnewcompany/addnewcompany.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddnewproductComponent } from './addnewproduct/addnewproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    ServicesComponent,
    CompaniesListComponent,
    ProductsComponent,
    AddnewcompanyComponent,
    AddnewproductComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
