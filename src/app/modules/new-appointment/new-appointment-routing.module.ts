import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAppointmentComponent } from './new-appointment.component';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { AppointmentsListComponent } from '../../components/appointments-list/appointments-list.component';

const routes: Routes = [
  {
    path: '',
    component: NewAppointmentComponent
  },
  {
    path: 'new',
    component: AppointmentFormComponent
  },
  {
    path: 'details/:id',
    component: AppointmentsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAppointmentRoutingModule { }
