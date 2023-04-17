import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { SelectionHandlerDirective } from 'src/app/directives/selection-handler.directive';
import { RescheduleHandlerDirective } from 'src/app/directives/reschedule-handler.directive';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';
import { DateSelectioHandlerDirective } from './directives/date-selectio-handler.directive';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentFormComponent,
    HomeComponent,
    AppointmentsListComponent,
    ScheduleManagementComponent,
    SelectionHandlerDirective,
    RescheduleHandlerDirective,
    DateSelectioHandlerDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioGroup,
    MatRadioButton
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
