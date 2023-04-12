import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';

import { MatCardModule} from '@angular/material/card';
import { MatRadioModule, MatRadioGroup, MatRadioButton} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { SelectionHandler } from 'src/app/directives/time-selection-handler.directive';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentFormComponent,
    HomeComponent,
    AppointmentsListComponent,
    SelectionHandler
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    DragDropModule,
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
