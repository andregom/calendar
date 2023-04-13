import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  form: FormGroup;
  now: Date = new Date();
  oneHourFromNow: Date;
  startDate: string;
  finnishDate: string;

  constructor(
    private ativateRoute: ActivatedRoute,
    public router: Router
  ) {
    this.oneHourFromNow = new Date();
    this.oneHourFromNow.setHours(this.now.getHours() + 1)
    this.startDate = formatDate(this.now, 'yyyy-MM-ddTHH:mm', 'en-US', '+0530');
    this.finnishDate = formatDate(this.oneHourFromNow, 'yyyy-MM-ddTHH:mm', 'en-US', '+0530');
    console.log(this.startDate);
    this.form = new FormGroup({
      title: new FormControl('New Appointment', Validators.required),
      participant: new FormControl(''),
      description: new FormControl(''),
      start: new FormControl(`${this.startDate}`, Validators.required),
      finnish: new FormControl(`${this.finnishDate}`, Validators.required),
    })
  }

  ngOnInit(): void {
  }

  goToTimeSlots(partialAppointmanet: any) {
    this.router.navigate([this.router.url, 'choose_available'])
    console.log(partialAppointmanet);
  }

  onSubmit(appointment: any) {
      this.router.navigate([this.router.url, 'details'])
      console.log(appointment);
  }

}
