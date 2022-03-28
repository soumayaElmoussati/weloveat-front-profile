import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchTakeawayComponent } from './search-takeaway/search-takeaway.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomeUserComponent } from './core/home-user/home-user.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeAdminComponent } from './core/home-admin/home-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {CartComponent} from './cart/cart.component';
import{PaymentComponent} from './payment/payment.component';
import{OrderStatutComponent} from './order-statut/order-statut.component';
import{SearchHomePageComponent} from './search-home-page/search-home-page.component';

const routes: Routes = [
  
  {path: '', component: SearchHomePageComponent}, 
  {path: 'search', component: SearchTakeawayComponent}, 
  {path: 'restaurants', component: SearchTakeawayComponent }, 
  {path: 'slug', component: RestaurantDetailComponent }, 
  {path: 'cart', component: CartComponent},
  {path: 'order', component: PaymentComponent},
  {path: 'orderStatut', component: OrderStatutComponent},
  {path: 'login', component: LoginComponent }, 
  {path: 'user', component: HomeUserComponent, children : [
    {path: '', loadChildren:() => import('./user/user-routing.module').then(m=>m.UserRoutingModule) },

  ] },

  {path: 'admin', component: HomeAdminComponent, children : [
    {path: '', loadChildren:() => import('./admin/admin-routing.module').then(m=>m.AdminRoutingModule) },

  ] },
 
  {path: ':slug', component: RestaurantDetailComponent }, 


  //  {path: '', component: SearchHomePageComponent}, 
  // {path: 'search', component: SearchTakeawayComponent}, 
  // {path: 'slug', component: RestaurantDetailComponent }, 
  // {path: 'cart', component: CartComponent},
  // {path: 'order', component: PaymentComponent},
  // {path: 'orderStatut', component: OrderStatutComponent},
  // {path: ':slug', component: RestaurantDetailComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
