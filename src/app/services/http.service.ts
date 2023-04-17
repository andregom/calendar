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

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${env.BASE_URL}/appointments/${id}`, {
      params: {},
    })
  }
  
  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${env.BASE_URL}/appointments`, appointment, {
      params: {},
    })
  }

  modifyAppointment(appointment: Appointment): Observable<Appointment> {
    console.log(appointment);
    const id = appointment.id;
    return this.http.put<Appointment>(`${env.BASE_URL}/appointments/${id}`, appointment, {
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
