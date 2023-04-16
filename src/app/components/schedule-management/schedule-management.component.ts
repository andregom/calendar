import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatCalendarUserEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from 'src/app/interfaces/appointment';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent {
  @Output() updateCalendarView: EventEmitter<number> = new EventEmitter();

  hours: number[];
  minutes: number[];

  selectedDay: BehaviorSubject<number>;

  selectedDates: BehaviorSubject<Set<Date>> = new BehaviorSubject(new Set());
  selectedDays: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set());
  selectedHours: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set());

  listOfAppointments: BehaviorSubject<Array<Appointment>> = new BehaviorSubject<Array<Appointment>>([]);

  today = new Date();
  todayDate = '';
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.todayDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    this.selectedDay = new BehaviorSubject(this.today.getDate());
    // Generate an array of all hours in a day (24-hour format)
    this.hours = Array.from({ length: 24 }, (_, i) => i);

    // Generate an array of all minutes in an hour
    this.minutes = Array.from({ length: 60 }, (_, i) => i);
  }

  ngOnInit(): void {
    this.httpService.getAppointmentList().subscribe((data: Array<any>) => {
      this.listOfAppointments.next(data);
    })

    this.listOfAppointments.subscribe((appointments) => {
      appointments.map((app) => {
        const startDate = new Date(app.start);
        const finnishDate = new Date(app.finnish);
        this.selectedDates.next(this.selectedDates.value.add(startDate));
        this.selectedDates.next(this.selectedDates.value.add(finnishDate));
        const startDay = startDate.getDate();
        const finnishDay = finnishDate.getDate();
        this.selectedDays.next(this.selectedDays.value.add(startDay));
        this.selectedDays.next(this.selectedDays.value.add(finnishDay));
      })

      this.selectedDay?.subscribe((day: number) => {
        this.selectedHours.next(new Set());
        this.listOfAppointments.value.map((app) => {
          const startDate = new Date(app.start);
          const finnishDate = new Date(app.finnish);
          if (startDate.getDate() === day) {
            const startHour = startDate.getHours();
            const finnishHour = finnishDate.getHours();
            this.selectedHours.next(this.selectedHours.value.add(startHour));
            this.selectedHours.next(this.selectedHours.value.add(finnishHour));
          }
        })
      })
    });

  }

  filterDates(date: Date): boolean {
    return this.selectedDays.value.has(date.getDate());
  }

  selectDay(event: MatCalendarUserEvent<Date>) {
    this.selectedDay?.next(event.value.getDate());
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    const gap = event.currentIndex - event.previousIndex;
    const newSet: Set<number> = new Set();
    this.selectedHours.value.forEach((hour: number) => {
      hour + gap >= 0 && newSet.add(hour + gap)
    });
    this.selectedHours.next(newSet);
  }

  deleteAppointment() {
    const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    queryParams['id'] !== undefined && this.httpService.deleteAppointment(queryParams['id']);
    this.router.navigate([this.router.url])
  }

}
