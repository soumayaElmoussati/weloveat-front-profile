import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailCommandeComponent } from './commandes/detail-commande/detail-commande.component';
import { AdditionalErrandsComponent } from './commandes/additional-errands/additional-errands.component';
import { ConfirmationDeleteComponent } from './commandes/confirmation-delete/confirmation-delete.component';
import { CategoryComponent } from './commandes/category/category.component';
import { ProductComponent } from './commandes/product/product.component';
import { IngredientComponent } from './commandes/ingredient/ingredient.component';
import { ConfirmationDeliveryComponent } from './commandes/confirmation-delivery/confirmation-delivery.component';
import { DetailCourseComponent } from './commandes/detail-course/detail-course.component';
import { DetailErrandComponent } from './commandes/detail-errand/detail-errand.component';
import { ConfirmationDeleteCategoryProductComponent } from './commandes/category/confirmation-delete-category-product/confirmation-delete-category-product.component';
import { ProductAdminComponent } from './commandes/product-admin/product-admin.component';
import { AddNewProductComponent } from './commandes/Product-admin/add-new-product/add-new-product.component';
import { ReservationsAdminComponent } from './reservations-admin/reservations-admin.component';
import { ConfirmationAcceptReservationComponent } from './reservations-admin/confirmation-accept-reservation/confirmation-accept-reservation.component';
import { ConfirmationRefuseReservationComponent } from './reservations-admin/confirmation-refuse-reservation/confirmation-refuse-reservation.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { EstablishmentAdminComponent } from './establishment-admin/establishment-admin.component';
import { AddZoneGeographiqueComponent } from './establishment-admin/add-zone-geographique/add-zone-geographique.component';
import { ReservationsSettingsComponent } from './reservations-settings/reservations-settings.component';
import { ConfirmationDeleteDeliveryZoneComponent } from './establishment-admin/confirmation-delete-delivery-zone/confirmation-delete-delivery-zone.component';
import { ConfirmationDeleteProductComponent } from './commandes/Product-admin/confirmation-delete-product/confirmation-delete-product.component';
import { ProductAdditionalComponent } from './commandes/Product-admin/product-additional/product-additional.component';
import { ConfirmationDeleteAdditionalProductComponent } from './commandes/Product-admin/confirmation-delete-additional-product/confirmation-delete-additional-product.component';
import { AddNewProductAdditionalComponent } from './commandes/product-admin/product-additional/add-new-product-additional/add-new-product-additional.component';

@NgModule({
  declarations: [ DetailCommandeComponent, AdditionalErrandsComponent, ConfirmationDeleteComponent, CategoryComponent, ProductComponent, IngredientComponent, ConfirmationDeliveryComponent, DetailCourseComponent, DetailErrandComponent, ConfirmationDeleteCategoryProductComponent, ProductAdminComponent, AddNewProductComponent, ReservationsAdminComponent, ConfirmationAcceptReservationComponent, ConfirmationRefuseReservationComponent, ProfileAdminComponent, EstablishmentAdminComponent, AddZoneGeographiqueComponent, ReservationsSettingsComponent, ConfirmationDeleteDeliveryZoneComponent, ConfirmationDeleteProductComponent, ProductAdditionalComponent, ConfirmationDeleteAdditionalProductComponent, AddNewProductAdditionalComponent],
  imports: [
    CommonModule
  
  ]
})
export class AdminModule { }
        