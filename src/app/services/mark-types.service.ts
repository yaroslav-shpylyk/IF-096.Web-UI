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
   * @returns - array of types of marks
   */
   public getAllMarkTypes(): Observable<MarkType[]> {
    return this.http.get<{status: any, data: MarkType[]}>(`/mark_types`)
    .pipe(
      map(result => result.data)
    );
   }

  /**
   * Method creates a new type of mark
   * @param markTypeData - object with data about new mark type
   * @returns - created mark type
   */
   createMarkType(markTypeData: MarkType): Observable<MarkType> {
     return this.http.post<MarkType>('/mark_types', markTypeData);
   }

  /**
   * The method changes the data  of existing mark type
   * @param id - id of editable mark
   * @param markType - object which we modify
   * @returns - edited mark type
   */
   changeMarkType(id: number, markType: MarkType): Observable<MarkType> {
     return this.http.put<MarkType>(`/mark_types/${id}`, markType);
   }
}
