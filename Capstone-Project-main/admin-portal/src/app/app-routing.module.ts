
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ServicesComponent } from './services/services.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { ProductsComponent } from './products/products.component';
import { AddnewcompanyComponent } from './addnewcompany/addnewcompany.component';
import { AddnewproductComponent } from './addnewproduct/addnewproduct.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
 // { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'addnewproduct', component: AddnewproductComponent, canActivate: [AuthGuard] },
  { path: 'addnewcompany', component: AddnewcompanyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
