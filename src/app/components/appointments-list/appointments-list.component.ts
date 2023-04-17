import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Appointment } from 'src/app/interfaces/appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCalendarUserEvent } from '@angular/material/datepicker';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})

export class AppointmentsListComponent implements OnInit {
  id: string | undefined;

  hours: number[];
  minutes: number[];

  selectedDay: BehaviorSubject<number>;


  selectedMinutesSet: Set<number> = new Set();
  selectedHoursSet: Set<number> = new Set();

  selectedMinutes: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set())
  selectedHours: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set())

  cannotBeSelectedMinutes: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set());
  cannotBeSelectedHours: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set());

  isSelectingHoursSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSelectingMinutesSub: BehaviorSubject<boolean> = new BehaviorSubject(false);

  listOfAppointments: BehaviorSubject<Array<Appointment>> = new BehaviorSubject<Array<Appointment>>([]);



  today = new Date();
  todayDate = '';
  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    this.id = queryParams['id'];

    this.todayDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    this.selectedDay = new BehaviorSubject(this.today.getDate());
    // Generate an array of all hours in a day (24-hour format)
    this.hours = Array.from({ length: 24 }, (_, i) => i);

    // Generate an array of all minutes in an hour
    this.minutes = Array.from({ length: 60 }, (_, i) => i);
  }

  ngOnInit(): void {
    this.httpService.getAppointmentList().subscribe((data: Array<Appointment>) => {
      const listOfAppointments = data.map((app: Appointment): Appointment => {
        const startDate = new Date(app.start);
        const finnishDate = new Date(app.finnish);
        return { ...app, start: startDate, finnish: finnishDate }
      })
      this.listOfAppointments.next(listOfAppointments);
    })

    this.selectedDay?.subscribe((day: number) => {
      this.cannotBeSelectedHours.next(new Set());
      this.cannotBeSelectedMinutes.next(new Set());
      this.listOfAppointments.subscribe((appointments) => {
        appointments.map((app) => {
          if (app.start.getDate() === day) {
            const startHour = app.start.getHours();
            const finnishHour = app.finnish.getHours();
            const startMinute = app.start.getMinutes();
            const finnishMinute = app.finnish.getMinutes();

            this.fillSpacesBetween(startHour, finnishHour, this.cannotBeSelectedHours);
            this.fillSpacesBetween(startMinute, finnishMinute, this.cannotBeSelectedMinutes);
          }
        })
      })
    })

    this.selectedHours.subscribe(value => {
      this.selectedHoursSet = value;
    })

  }

  reschedule(event: MatOptionSelectionChange<Appointment>) {
    console.log(event.source.value);
    const appointment = event.source.value;
    const id = appointment.id;
    const url = this.router.url.split('/');
    url[1] = "appointment"
    console.log(url);
    const newUrl = url.slice(0, url.length - 1).join('/')
    this.router.navigate([newUrl, 'reschedule'], { queryParams: { id } , state: { appointment: appointment }});
  }

  fillSpacesBetween(start: number, finnish: number, timeUnity: BehaviorSubject<Set<number>>) {
    for (let time = start; time <= finnish; time++)
      timeUnity.next(timeUnity.value.add(time));
  }

  selectDay(event: MatCalendarUserEvent<Date>) {
    this.selectedDay.next(event.value.getDate());
    this.selectedHours.next(new Set());
    this.selectedMinutes.next(new Set());
  }

  startSelectingHours() {
    this.isSelectingHoursSub.next(true);
  }

  finishSelectingHours() {
    this.isSelectingHoursSub.next(false);
  }

  startSelectingMinutes() {
    this.isSelectingMinutesSub.next(true);
  }

  startNewSelectionHours() {
    this.selectedHours.next(new Set([]));
  }

  startNewSelectionMinutes() {
    this.selectedMinutes.next(new Set([]));
  }

  finishSelectingMinutes() {
    this.isSelectingMinutesSub.next(false);
    this.fillinThegaps(this.selectedMinutes);
  }

  fillinThegaps(setSubscription: BehaviorSubject<Set<number>>) {
    const set = setSubscription.value;
    const minMax = [...set].sort();

    const arr: Set<number> = new Set()
    let prev: any = undefined;
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
    // console.log(arr);
    setSubscription.next(new Set(arr));
  }

  selectHourItem(event: any) {
    this.selectedHours.next(this.selectedHours.value.add(Number(event)));
    this.fillinThegaps(this.selectedHours);
  }

  selectMinuteItem(event: any) {
    this.selectedMinutes.next(this.selectedMinutes.value.add(Number(event)));
    this.fillinThegaps(this.selectedMinutes);
  }

  change(event: MatOptionSelectionChange<number>): void {
    if (event) {
      //User selected day
    }
  }
}
