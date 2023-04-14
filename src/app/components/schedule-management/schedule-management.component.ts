import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent {
  hours: number[];
  minutes: number[];

  selectedHours: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set())

  today = new Date();
  todayDate = '';
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.selectedHours.next(new Set());

    this.todayDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    // Generate an array of all hours in a day (24-hour format)
    this.hours = Array.from({ length: 24 }, (_, i) => i);

    // Generate an array of all minutes in an hour
    this.minutes = Array.from({ length: 60 }, (_, i) => i);
  }

}
