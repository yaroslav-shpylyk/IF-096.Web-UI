import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkType } from '../models/mark-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MarkTypesService {

  constructor( private http: HttpClient) { }

  /**
   * Method gets all mark types
   * @param options - Object of params, which we use as query with request
   * @returns - array of types of marks
   */

   public getAllMarkTypes(): Observable<MarkType[]> {
    return this.http.get<{status: any, data: MarkType[]}>(`/mark_types`)
    .pipe(
      map(result => result.data)
    );
   }
}
