import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandesComponent } from './commandes/commandes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EvaluationsComponent } from './evaluations/evaluations.component'
import { FacturesComponent } from './factures/factures.component';
import { DetailCommandeComponent } from './commandes/detail-commande/detail-commande.component';
import { AdditionalErrandsComponent } from './commandes/additional-errands/additional-errands.component';
import { CategoryComponent } from './commandes/category/category.component';
import { DetailCourseComponent } from './commandes/detail-course/detail-course.component';
import { ProductAdminComponent } from './commandes/product-admin/product-admin.component';
import { ReservationsAdminComponent } from './reservations-admin/reservations-admin.component';
import { AddNewProductComponent } from './commandes/product-admin/add-new-product/add-new-product.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { EstablishmentAdminComponent } from './establishment-admin/establishment-admin.component';
import { ReservationsSettingsComponent } from './reservations-settings/reservations-settings.component';
import { ProductAdditionalComponent } from './commandes/product-admin/product-additional/product-additional.component';


const routes: Routes = [

    {path: '', component: DashboardComponent }, 
    {path: 'evaluations', component: EvaluationsComponent }, 
    {path: 'orders', component: CommandesComponent }, 
    {path: 'orders/:id', component: DetailCommandeComponent }, 
    {path: 'factures', component: FacturesComponent }, 
    {path: 'details', component: DetailCommandeComponent }, 
    {path: 'additionalErrands', component: AdditionalErrandsComponent  },
    {path: 'detailsErrand', component: DetailCourseComponent },
    {path: 'additionalErrands/:id', component: DetailCourseComponent },
    {path: 'categories', component: CategoryComponent },
    {path: 'products-admin', component: ProductAdminComponent},
    {path: 'reservations-admin', component: ReservationsAdminComponent},
    {path: 'addNewProduct', component: AddNewProductComponent},
    {path: 'profile-admin', component: ProfileAdminComponent},
    {path: 'establishement-admin', component: EstablishmentAdminComponent},
    {path: 'reservation-setting', component: ReservationsSettingsComponent},
    {path: 'additionalProducts-admin', component: ProductAdditionalComponent}

  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminRoutingModule { }