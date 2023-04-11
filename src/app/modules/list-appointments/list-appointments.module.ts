import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAppointmentsRoutingModule } from './list-appointments-routing.module';
import { ListAppointmentsComponent } from './list-appointments.component';


@NgModule({
  declarations: [
    ListAppointmentsComponent
  ],
  imports: [
    CommonModule,
    ListAppointmentsRoutingModule,
  ]
})
export class ListAppointmentsModule { }
