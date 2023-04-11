import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent {
  hours: number[];
  minutes: number[];
  selectedHour: number | undefined;
  selectedMinute: number | undefined;

  today= new Date();
  todayDate = '';
  constructor() {
    this.todayDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    // Generate an array of all hours in a day (24-hour format)
    this.hours = Array.from({length: 24}, (_, i) => i);

    // Generate an array of all minutes in an hour
    this.minutes = Array.from({length: 12}, (_, i) => i * 5);
  }
}
