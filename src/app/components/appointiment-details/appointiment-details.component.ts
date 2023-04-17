import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Appointment } from 'src/app/interfaces/appointment'
// import { state } from '@angular/animations';

@Component({
  selector: 'app-appointiment-details',
  templateUrl: './appointiment-details.component.html',
  styleUrls: ['./appointiment-details.component.scss']
})
export class AppointimentDetailsComponent implements OnInit{
  appointment: Appointment | undefined

  constructor(
    public router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    console.log(queryParams)
    this.httpService.getAppointment(queryParams['id']).subscribe((res) => {
      this.appointment = res;
    })
  }

  reschedule() {
    const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    this.router.navigate([this.router.url, 'reschedule'], { queryParams: queryParams , state: { appointment: this.appointment }});
  }
}
