import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  state$: Observable<object> = new Observable;

  form: FormGroup;
  now: Date = new Date();
  oneHourFromNow: Date;
  start: string;
  finnish: string;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.oneHourFromNow = new Date();
    this.oneHourFromNow.setHours(this.now.getHours() + 1)
    this.start = formatDate(this.now, 'yyyy-MM-ddTHH:mm', 'en-US', '+0530');
    this.finnish = formatDate(this.oneHourFromNow, 'yyyy-MM-ddTHH:mm', 'en-US', '+0530');
    console.log(this.start);
    this.form = new FormGroup({
      title: new FormControl('New Appointment', Validators.required),
      participant: new FormControl(''),
      description: new FormControl(''),
      start: new FormControl(`${this.start}`, Validators.required),
      finnish: new FormControl(`${this.finnish}`, Validators.required),
    })
  }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
  }

  goToTimeSlots(partialAppointmanet: any) {
    this.router.navigate([this.router.url, 'choose_available'], {state: {...partialAppointmanet}});
    console.log(partialAppointmanet);
  }

  onSubmit(appointment: any) {
      this.httpService.createAppointment(appointment).subscribe((res) => {
        console.log(res);
      });
      this.router.navigate([this.router.url, 'details'], {state: {...appointment}});
      console.log(appointment);
  }

}
