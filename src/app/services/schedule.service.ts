import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ScheduleData } from '../models/schedule-data';
import { SubjectData } from '../models/subject-data';

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
  getSchedule(classId: number): Observable<any> {
    return this.http.get(`/classes/${classId}/schedule`).pipe(map(
      (response: {status: any, data: ScheduleData}) => response.data
    ))
  }

  /**
   * Method gets subjects that are related to the class by class id
   * @param classId - Id of class
   * @returns - Array with subjects data or error if that happens
   */
  getSubjects(classId: number): Observable<any> {
    return this.http.get(`/subjects?classId=${classId}`).pipe(map(
      (response: {status: any, data: SubjectData}) => response.data
    ))
  }

  /**
   * Method saves schedule for the class by id
   * @param classId - Id of class
   * @param data - Array with schedule data
   * @returns - Array with schedule data or error if that happens
   */
  saveSchedule(classId: number, data: ScheduleData): Observable<any> {
    return this.http.post(`/classes/${classId}/schedule`, data).pipe(map(
      (response: {status: any, data: ScheduleData}) => response.data
    ))
  }
}
