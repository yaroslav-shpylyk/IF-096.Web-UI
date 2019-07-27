import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Observable, Subject, forkJoin } from 'rxjs';
import { StudentBookData } from '../models/student-book-data';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class StudentBookService {
  inputDate: string;

  constructor(private http: HttpClient) {
  }

  /**
   * Method gets data from server, using weekStartDate as day of starting
   * @returns schedule for getInputDate week
   */
  public getStudentBook(startDate?: string): Observable<StudentBookData[]> {
    const weekStart = startDate || this.inputDate;
    return this.http.get('/diaries', {params: {weekStartDate: weekStart}})
      .pipe(
        map((result: { status: any, data: StudentBookData[] }) => result.data)
      );
  }

  /**
   * Method which takes Input Date from component
   * @param value from method onEnter in student-book.component.ts
   */
  public getInputDate(value) {
    this.inputDate = value;
  }

  /**
   * Method which get data from server to download files in student-book home work
   * @param id - id of lesson which is a file
   * @returns data (json) from server
   */
  public getHomeworkFile(id): Observable<any> {
    return this.http.get(`/homeworks/files/${id}`)
      .pipe(
        map((result: { status: any, data: any }) => result.data)
      );
  }

  /**
   * Method which get all pupil marks in date range
   * @param startDate - start date of the range
   * @param endDate - end date of the range
   * @returns data (json) from server
   */
  public getAllMarks(startDate: string, endDate: string): Observable<StudentBookData[]> {
    const marksSubject = new Subject<StudentBookData[]>();
    const endDateValue = moment(endDate);
    const requests = [];
    let mondayDate = moment(startDate);
    while (mondayDate.isBefore(endDateValue)) {
      requests.push(this.getStudentBook(mondayDate.format('YYYY-MM-DD')));
      mondayDate = moment(mondayDate).add(7, 'days');
    }

    forkJoin(requests).pipe(
      map(
        res => {
          return [].concat(...res).filter(
            lesson => lesson.mark > 0
          );
        }
      )
    ).subscribe( res => marksSubject.next(res) );
    return marksSubject.asObservable();
  }
}
