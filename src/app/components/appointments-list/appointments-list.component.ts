import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';

type reduceReturnType = {
  arr: Array<number>;
  prev: number;
}

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

  selectedMinutesSet: Set<number> = new Set();
  selectedHoursSet: Set<number> = new Set();

  selectedMinutes: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set())
  selectedHours: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set())

  isSelecting: boolean = false;

  isSelectingHoursSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSelectingMinutesSub: BehaviorSubject<boolean> = new BehaviorSubject(false);



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

  startSelectingHours(event: any) {
    this.isSelectingHoursSub.next(true);
  }

  finishSelectingHours() {
    this.isSelectingHoursSub.next(false);
  }

  startSelectingMinutes(event: any) {
    this.isSelectingMinutesSub.next(true);
  }

  finishSelectingMinutes() {
    this.isSelectingMinutesSub.next(false);
  }

  fillinThegaps() {
    const set = this.selectedMinutes.value;
    const minMax = [...set].sort();

    var arr: Set<number> = new Set()
    var prev: any = undefined;
    for (let i = 0; i < minMax.length; i++) {
      const el = minMax[i];
      if (prev !== undefined && el > prev + 1) {
        for (let i = prev; i <= el; i++) {
          arr.add(i);
        }
      } else {
        arr.add(el);
      }
      prev = el;
    }
    console.log(arr);
    this.selectedMinutes.next(new Set(arr));
  }

  selectMinuteItem(event: any) {
    this.selectedMinutes.next(this.selectedMinutes.value.add(Number(event)));
    this.fillinThegaps();
    if (this.isSelectingMinutesSub.value) {
      // const value = Number(event.target.firstElementChild.innerText);
      console.log(event);
      // console.log(this.selectedMinutes.value);
    }
  }

  change(event: any): void {
    if (event.isUserInput) {
    }
  }
}
