import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'appointment',
    loadChildren: () => import('./modules/new-appointment/new-appointment.module').then(m => m.NewAppointmentModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./modules/list-appointments/list-appointments.module').then(m => m.ListAppointmentsModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
