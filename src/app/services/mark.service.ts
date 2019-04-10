import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassService} from './class.service';
import { StudentsService } from './students.service';
import { MarksRequestOptions } from '../models/marks-request-options';
import { map, switchMap, tap} from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { MarkData } from '../models/mark-data';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) { }

  /**
   * Method gets marks filtered by params
   * @param options - Object of params, which we use as query with request
   */
  public getMarks(options?: MarksRequestOptions): Observable<MarkData[]> {
    let requestParams;
    if (options !== undefined && Object.keys(options).length) {
      const optionKeys = Object.keys(options);
      const formatedOptions = optionKeys
        .map(item => `${item}=${options[item]}`)
        .join('&');
      requestParams = `?${formatedOptions}`;
    } else {
      requestParams = '';
    }
    return this.http.get(`/marks${requestParams}`)
      .pipe(
        map((result: {status: any, data: MarkData[]}) => result.data)
      );
  }
  public getProgressMarks(options?: MarksRequestOptions): Observable<any> {
    const uniqueDates = [];
    return options.student_id.length === 1 ?
      this.getMarks(options) :
      combineLatest(options.student_id.map(item => {
        options.student_id = [item];
        return this.getMarks(options);
      }))
        .pipe(
          tap(result => {
            const dates = [];
            for (const student of result) {
              for ( const mark of student ) {
                const date =  new Date(mark.x[0], mark.x[1], mark.x[2]);
                dates.push(date);
              }
            }
            dates
              .sort((itemA, itemB) => itemA.getTime() - itemB.getTime())
              .map(date => {
                return date
                  .toISOString()
                  .slice(0, 10)
                  .split('-')
                  .reverse()
                  .join('-');
              })
              .forEach(date => {
                if (!uniqueDates.includes(date)) {
                  uniqueDates.push(date);
                }
              });
          }),
          map(result => {

          })
        );
  }
}
