import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject, forkJoin, BehaviorSubject, of } from 'rxjs';
import { StudentBookData } from '../models/student-book-data';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class StudentBookService {
  inputDate: string;
  storedMarks = new BehaviorSubject<{startDate: _moment.Moment, endDate: _moment.Moment, scores: StudentBookData[]}>(null);
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
   * Method which get all pupil marks in date range from server and stored them
   * @param startDate - start date of the range
   * @param endDate - end date of the range
   * @returns data (json) from server
   */
  private getMarksFromServer(startDate: _moment.Moment, endDate: _moment.Moment): Observable<StudentBookData[]> {
    const marksSubject = new Subject<StudentBookData[]>();
    const endDateValue = endDate;
    const requests = [];
    let mondayDate = startDate;
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
    ).subscribe( res => {
      marksSubject.next(res);

      let newRangeStart = startDate;
      let newRangeEnd = endDate;
      let newMarks = res;

      if ( this.storedMarks.value ) {
        if (moment(newRangeStart).isAfter(this.storedMarks.value.startDate)) {
          newRangeStart = this.storedMarks.value.startDate;
        }
        if (moment(newRangeEnd).isBefore(this.storedMarks.value.endDate)) {
          newRangeEnd = this.storedMarks.value.endDate;
        }
        newMarks = newMarks.concat(...this.storedMarks.value.scores);
      }
      this.storedMarks.next( {startDate: newRangeStart, endDate: newRangeEnd, scores: newMarks} );
    } );
    return marksSubject.asObservable();
  }

  /**
   * The method which gets all pupil marks in the date range from stored marks
   * and sends requests to the server to get scores if the date range is out of stored range
   * @param startDate - start date of the range
   * @param endDate - end date of the range
   * @returns data with marks
   */
  getMarks(startDate: _moment.Moment, endDate: _moment.Moment): Observable<StudentBookData[]> {

    const marksInRange: Observable<StudentBookData[]>[] = [];
    let marksBeforeStoredRange: Observable<StudentBookData[]>;
    let marksAfterStoredRange: Observable<StudentBookData[]>;

    if (this.storedMarks.value) {
      const storedStartDate = this.storedMarks.value.startDate;
      const storedEndDate = this.storedMarks.value.endDate;

      const storedMarksInRange = this.storedMarks.value.scores.filter(
        dayData => {
          const curDate = moment(dayData.date).subtract(1, 'M');
          return curDate.isBetween(startDate, endDate, null, '[]');
        }
      );

      marksInRange.push(of(storedMarksInRange));
      if (startDate.isBefore(storedStartDate)) {
        marksBeforeStoredRange =  this.getMarksFromServer(startDate, storedStartDate);
        marksInRange.unshift(marksBeforeStoredRange);
      }
      if (endDate.isAfter(storedEndDate)) {
        marksAfterStoredRange =  this.getMarksFromServer(storedEndDate, endDate );
        marksInRange.push(marksAfterStoredRange);
      }

      return forkJoin(marksInRange).pipe(
        map( data => [].concat(...data) )
      );
    } else {
      return this.getMarksFromServer(startDate, endDate);
    }
  }
}
