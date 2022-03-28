// import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
//import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { QuillModule } from 'ngx-quill';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChartsModule } from 'ng2-charts';
//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY} from '@angular/material/snack-bar';
import { CookieService, CookieModule } from '@gorniv/ngx-universal';
import { SearchTakeawayComponent } from './search-takeaway/search-takeaway.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './shared/components/product/product.component';
import { RestaurantComponent } from './shared/components/restaurant/restaurant.component';
import { SharedModule } from '../app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogElementComponent } from './dialog-element/dialog-element.component';
import { HomeUserComponent } from './core/home-user/home-user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { FooterComponent } from './core/footer/footer.component';
import { OrdersComponent } from './user/orders/orders.component';
import { FavorisComponent } from './user/favoris/favoris.component';
import { AdressesComponent } from './user/adresses/adresses.component';
import { LoyalityPointsComponent } from './user/loyality-points/loyality-points.component';
import { InviteFriendsComponent } from './user/invite-friends/invite-friends.component';
import { ReservationsComponent } from './user/reservations/reservations.component';
import { LoginComponent } from './auth/login/login.component';
import { UniversalStorage } from './shared/storage/universal.storage';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { DialogAdresseComponent } from './user/dialog-adresse/dialog-adresse.component';
import { HomeAdminComponent } from './core/home-admin/home-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { FacturesComponent } from './admin/factures/factures.component';
import { EvaluationsComponent } from './admin/evaluations/evaluations.component';
import { SearchComponent } from './shared/components/search/search.component';
import { PopUpElementComponent } from './pop-up-element/pop-up-element.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { RestaurantDetailsHeaderComponent } from './shared/components/restaurant-details-header/restaurant-details-header.component';
import { OrderStatutComponent } from './order-statut/order-statut.component';
import { SearchHomePageComponent } from './search-home-page/search-home-page.component';
import { OrderComponent } from './shared/components/order/order.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoyaltyPointComponent } from './loyalty-point/loyalty-point.component';
import { BrowserModule } from '@angular/platform-browser';
import { DetailCommandeComponent } from './admin/commandes/detail-commande/detail-commande.component';
import { NotificationShippingComponent } from './admin/commandes/notification-shipping/notification-shipping.component';
import { CloturerOrderComponent } from './admin/commandes/cloturer-order/cloturer-order.component';
import { AdditionalErrandsComponent } from './admin/commandes/additional-errands/additional-errands.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetailCourseComponent } from './admin/commandes/detail-course/detail-course.component';
import { CategoryComponent } from './admin/commandes/category/category.component';
import { ConfirmationDeleteCategoryProductComponent } from './admin/commandes/category/confirmation-delete-category-product/confirmation-delete-category-product.component';
import { ProductAdminComponent } from './admin/commandes/product-admin/product-admin.component';
import { ReservationsAdminComponent } from './admin/reservations-admin/reservations-admin.component';
import { ConfirmationAcceptReservationComponent } from './admin/reservations-admin/confirmation-accept-reservation/confirmation-accept-reservation.component';
import { ConfirmationRefuseReservationComponent } from './admin/reservations-admin/confirmation-refuse-reservation/confirmation-refuse-reservation.component';
import { AddNewProductComponent } from './admin/commandes/product-admin/add-new-product/add-new-product.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { EstablishmentAdminComponent } from './admin/establishment-admin/establishment-admin.component';
import { ReservationsSettingsComponent } from './admin/reservations-settings/reservations-settings.component';
import { ConfirmationDeleteDeliveryZoneComponent } from './admin/establishment-admin/confirmation-delete-delivery-zone/confirmation-delete-delivery-zone.component';
import { AddZoneGeographiqueComponent } from './admin/establishment-admin/add-zone-geographique/add-zone-geographique.component';
import { ConfirmationDeleteProductComponent } from './admin/commandes/product-admin/confirmation-delete-product/confirmation-delete-product.component';
import { ProductAdditionalComponent } from './admin/commandes/product-admin/product-additional/product-additional.component';
import { ConfirmationDeleteAdditionalProductComponent } from './admin/commandes/product-admin/confirmation-delete-additional-product/confirmation-delete-additional-product.component';
import { AddNewProductAdditionalComponent } from './admin/commandes/product-admin/product-additional/add-new-product-additional/add-new-product-additional.component';


import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ 
    AppComponent,
    SearchTakeawayComponent,
    ProductComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    PageNotFoundComponent,
    DialogElementComponent,
    HomeUserComponent,
    ProfileComponent,
    FooterComponent,
    OrdersComponent, FavorisComponent,
    AdressesComponent,
    LoyalityPointsComponent, InviteFriendsComponent, ReservationsComponent, DialogAdresseComponent,
    LoginComponent,
    HomeAdminComponent,
    DashboardComponent,
    CommandesComponent,
    FacturesComponent,
    EvaluationsComponent,
    SearchComponent,
    PopUpElementComponent,
    CartComponent,
    PaymentComponent,
    RestaurantDetailsHeaderComponent,
    OrderStatutComponent,
    SearchHomePageComponent,
    OrderComponent,
    FooterComponent,
    LoyaltyPointComponent,
    DetailCommandeComponent,
    NotificationShippingComponent,
    CloturerOrderComponent,
    AdditionalErrandsComponent,
    DetailCourseComponent,
    CategoryComponent,
    ConfirmationDeleteCategoryProductComponent,
    ProductAdminComponent,
    ReservationsAdminComponent,
    ConfirmationAcceptReservationComponent,
    ConfirmationRefuseReservationComponent,
    AddNewProductComponent,
    ProfileAdminComponent,
    EstablishmentAdminComponent,
    ReservationsSettingsComponent,
    ConfirmationDeleteDeliveryZoneComponent,
    AddZoneGeographiqueComponent,
    ConfirmationDeleteProductComponent,
    ProductAdditionalComponent,
    ConfirmationDeleteAdditionalProductComponent,
    AddNewProductAdditionalComponent
    
  ],
  imports: [
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatDividerModule,
    MatExpansionModule,
    MatRadioModule,
    SharedModule,
    MatButtonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    //ReactiveFormsModule, 
    //FormsModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    DragDropModule,
    /*
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDcFRKP7AWpsC5saNKrqsYsOLmWx_b_Vrw',
      libraries: ['places']
    }),*/
    AgmDirectionModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    InfiniteScrollModule,
    ChartsModule,
    // NgxMatSelectSearchModule,
    MatSnackBarModule,
    CookieModule.forRoot()
  ],
  providers: [
    CookieService,
    UniversalStorage,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }*/
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }