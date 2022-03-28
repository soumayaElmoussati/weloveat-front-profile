import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DialogAdresseComponent } from './dialog-adresse/dialog-adresse.component';
import { ConfirmationComponentComponent } from './confirmation-component/confirmation-component.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [DialogAdresseComponent, ConfirmationComponentComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
