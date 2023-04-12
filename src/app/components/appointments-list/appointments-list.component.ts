import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';

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

  selectedHoursSet: Set<number> = new Set([1, 5]);
  selectedHours: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set([1, 6]))
  isSelecting: boolean = false;

  public selectOptions: Object = {};
  public pageSettings: Object = {};

  today = new Date();
  todayDate = '';
  constructor() {
    this.selectedHours.next(new Set());

    this.todayDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    // Generate an array of all hours in a day (24-hour format)
    this.hours = Array.from({ length: 24 }, (_, i) => i);

    // Generate an array of all minutes in an hour
    this.minutes = Array.from({ length: 60 }, (_, i) => i);
  }

  ngOnInit(): void {
    this.selectOptions = { cellSelectionMode: 'Box', type: 'Multiple', mode: 'Cell' };
    this.pageSettings = { pageCount: 5 };
    this.isSelecting = false;
    this.selectedHours.subscribe(value => {
      this.selectedHoursSet = value;
    })
  }

  startSelecting(event: any) {
    console.log(event.target);
    this.isSelecting = true;
    const value = Number(event.target.firstElementChild.innerText);
    this.selectedHours.next(this.selectedHours.value.add(Number(value)));
    this.selectedHours.next(this.selectedHours.value.add(event.target.value));
  }

  finishSelecting() {
    this.isSelecting = false;
  }

  selectItem(event: any) {
    if (this.isSelecting) {
      const value = Number(event.target.firstElementChild.innerText);
      this.selectedHours.next(this.selectedHours.value.add(Number(value)));
      console.log(event.target);
      console.log(event.target.firstElementChild.innerText);
      console.log(this.selectedHours.value);
      console.log(this.selectedHours.value.has(value));
    }
  }

  change(event: any): void {
    if (event.isUserInput) {
      // console.log(event.source.value, event.source.selected);
    }
  }
}
