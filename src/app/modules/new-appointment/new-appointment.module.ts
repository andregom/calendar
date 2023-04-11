import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAppointmentRoutingModule } from './new-appointment-routing.module';
import { NewAppointmentComponent } from './new-appointment.component';


@NgModule({
  declarations: [
    NewAppointmentComponent
  ],
  imports: [
    CommonModule,
    NewAppointmentRoutingModule
  ]
})
export class NewAppointmentModule { }
