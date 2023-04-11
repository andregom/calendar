import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAppointmentsComponent } from './list-appointments.component';
import { AppointmentsListComponent } from 'src/app/components/appointments-list/appointments-list.component';

const routes: Routes = [
  {
    path: '',
    component: ListAppointmentsComponent
  },
  {
    path: 'list',
    component: AppointmentsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAppointmentsRoutingModule { }
