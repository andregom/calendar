import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment';

import { environment as env } from '../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAppointmentList(): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(`${env.BASE_URL}/appointments`, {
      params: {},
    })
  }
  
  createAppointment(appointment: Appointment): Observable<Array<Appointment>> {
    console.log(appointment);
    return this.http.post<Array<Appointment>>(`${env.BASE_URL}/appointments`, appointment, {
      params: {},
    })
  }

  modifyAppointment(appointment: Appointment): Observable<Array<Appointment>> {
    console.log(appointment);
    return this.http.put<Array<Appointment>>(`${env.BASE_URL}/appointments`, appointment, {
      params: {},
    })
  }

  deleteAppointment(id: number): Observable<Array<Appointment>> {
    console.log(id);
    return this.http.delete<Array<Appointment>>(`${env.BASE_URL}/appointments`, {
      params: { id: id },
    })
  }
}
