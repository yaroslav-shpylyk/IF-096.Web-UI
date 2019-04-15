import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleData } from '../models/schedule-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  /**
   * Method gets schedule for the class by id
   * @param classId - Id of class
   * @returns - Array with schedule data
   */
  getSchedule(classId:number): Observable<any> {
    return this.http.get('/classes/40/schedule').pipe(map(
      (response: {status: any, data: any}) => {
        return response.status;
      }
    ));
  }
}
