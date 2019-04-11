import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarksRequestOptions } from '../models/marks-request-options';
import { map } from 'rxjs/operators';
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
      const formattedOptions = optionKeys
        .map(item => `${item}=${options[item]}`)
        .join('&');
      requestParams = `?${formattedOptions}`;
    } else {
      requestParams = '';
    }
    return this.http.get(`/marks${requestParams}`)
      .pipe(
        map((result: {status: any, data: MarkData[]}) => result.data)
      );
  }
}
