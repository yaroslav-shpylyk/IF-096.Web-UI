import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScheduleData } from '../models/schedule-data';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) { }

  /**
   * Method gets schedule for the class by id
   * @param classId - Id of class
   * @returns - Array with schedule data or error if that happens
   */
  getSchedule(classId: number): Observable<ScheduleData> {
    return this.http.get(`/classes/${classId}/schedule`).pipe(map(
      (response: {status: any, data: ScheduleData}) => response.data
    ));
  }

  /**
   * Method saves schedule for the class by id
   * @param classId - Id of class
   * @param data - Array with schedule data
   * @returns - Array with schedule data or error if that happens
   */
  saveSchedule(classId: number, data: ScheduleData): Observable<ScheduleData> {
    return this.http.post(`/classes/${classId}/schedule`, data).pipe(map(
      (response: {status: any, data: ScheduleData}) => response.data
    ));
  }
}
