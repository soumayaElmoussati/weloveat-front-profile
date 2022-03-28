import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { FavorisComponent } from './favoris/favoris.component';
import { AdressesComponent } from './adresses/adresses.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { LoyalityPointsComponent } from './loyality-points/loyality-points.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  {path: '', component: ProfileComponent }, 
  {path: 'profile', component: ProfileComponent }, 
  {path: 'orders', component: OrdersComponent }, 
  {path: 'favoris', component: FavorisComponent }, 
  {path: 'adresses', component: AdressesComponent }, 
  {path: 'inviteFriends', component: InviteFriendsComponent }, 
  {path: 'loyalityPoints', component: LoyalityPointsComponent }, 
  {path: 'reservations', component: ReservationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
