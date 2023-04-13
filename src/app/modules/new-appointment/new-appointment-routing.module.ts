import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { NewAppointmentComponent } from './new-appointment.component';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { AppointmentsListComponent } from '../../components/appointments-list/appointments-list.component';
import { AppointimentDetailsComponent } from 'src/app/components/appointiment-details/appointiment-details.component';

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
    path: 'new/choose_available',
    component: AppointmentsListComponent
  },
  {
    matcher: matchUploadURL, 
    // path: `*details/:id`,
    component: AppointimentDetailsComponent
  }
];

function matchUploadURL(url: UrlSegment[]) {
  const ending = 'details'
  const ensWith = url[url.length -1].path.match('details') ? ({consumed: url}) : null;
  return ensWith;
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAppointmentRoutingModule { }
