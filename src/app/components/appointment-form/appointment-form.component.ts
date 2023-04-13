import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  form: FormGroup;

  constructor () {
    this.form = new FormGroup({
      title: new FormControl('New Appointment', Validators.required),
      participant: new FormControl(''),
      description: new FormControl(''),
      start: new FormControl('', Validators.required),
      finnish: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  onSubmit(appointment: any) {

  }

}
