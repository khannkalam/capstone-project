
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ServicesComponent } from './services/services.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'viewproducts', component: AllProductsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
