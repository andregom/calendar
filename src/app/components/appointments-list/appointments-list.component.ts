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

  selectedHoursSet: Set<number> = new Set();
  selectedHours: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set())
  isSelecting: boolean = false;

  public selectOptions: Object = {};
  public pageSettings: Object = {};

  today = new Date();
  todayDate = '';
  constructor() {
    this.selectedHours.next(new Set());
    console.log(this.selectedHours.value.size === 0);
    
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
    console.log(this.selectedHours.value.size === 0);
  }

  deselectIfSelected(event: any) {
    if (this.selectedHours.value.size === 0) {
      this.isSelecting = true;
      const value = Number(event.target?.firstElementChild.innerText);
      this.selectedHours.next((()=> {
        this.selectedHours.value.delete(value);
        return this.selectedHours.value;
      })());
      this.isSelecting = false;
    }
  }

  startSelecting(event: any) {
    if (this.selectedHours.value.size === 0) {
      this.isSelecting = true;
      const value = Number(event.target.firstElementChild.innerText);
      this.selectedHours.next(new Set([value]));
    } else if (this.selectedHours.value.size > 0) {
      this.selectedHours.next(new Set());
      this.isSelecting = false;
    }
  }
  
  finishSelectingByLeave(event: any) {
    this.isSelecting = false;
  }

  finishSelectingByMouseUp(event: any) {
    event.preventDefault();
    if (this.selectedHours.value.size === 1) {
      console.log(this.selectedHours.value);
      const value = Number(event.target?.firstElementChild.innerText);
      this.selectedHours.next((() => {
        const set = this.selectedHours.value;
        this.selectedHours.value.delete(Number(value));
        return new Set();
      })());
    }
    this.isSelecting = false;
    console.log(this.selectedHours.value);
  }
  
  deselect(event: any) {
    event.preventDefault();
    console.log(this.selectedHours.value.size === 0);
  }

  selectItem(event: any) {
    if (this.isSelecting) {
      const value = Number(event.target?.firstElementChild.innerText);
      this.selectedHours.next(this.selectedHours.value.add(Number(value)));
    }
  }

  change(event: any): void {
    
    if (event.isUserInput) {
    }
  }
}
