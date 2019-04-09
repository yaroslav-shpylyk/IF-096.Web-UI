import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassService} from './class.service';
import { StudentsService } from './students.service';
import { MarksRequestOptions } from '../models/marks-request-options';
import { map, switchMap, tap} from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient, private classService: ClassService, private studentService: StudentsService) { }

  /**
   * Method gets marks filtered by params
   * @param options - Object of params, which we use as query with request
   */
  public getMarks(options?: MarksRequestOptions): Observable<any> {
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
    console.log(requestParams);
    return this.http.get(`/marks${requestParams}`);
  }
  public getProgressMarks(options?: MarksRequestOptions): Observable<any> {
    return options.student_id ?
      this.getMarks(options) :
      this.studentService.getStudents(options.class_id)
        .pipe(
          map(result => {
            return result.map(item => {
              options.student_id = item.id;
              return this.getMarks(options);
            });
          }),
          switchMap(result => combineLatest(...result)),
          map(result => result.map(item => item.data)),
          tap(result => console.log(result))
        );

  }
}
