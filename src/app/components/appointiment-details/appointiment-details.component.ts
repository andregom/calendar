import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-appointiment-details',
  templateUrl: './appointiment-details.component.html',
  styleUrls: ['./appointiment-details.component.scss']
})
export class AppointimentDetailsComponent {
  constructor(
    public router: Router,
    private location: Location,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  reschedule() {
    this.router.navigate([this.router.url, 'reschedule'], {});
  }
}
