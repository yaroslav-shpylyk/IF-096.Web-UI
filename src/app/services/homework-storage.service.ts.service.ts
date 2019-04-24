import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeworkStorageService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Method gets id of the teacher to be changed and an object
   * with new values. Then passes it to the server in put request.
   * @param id - number representing id of the teacher.
   * @param teacher - object with new values.
   * @returns - object representing teacher.
   */
  saveHomework(homeworkData): Observable<any> {
    return this.httpClient.put(`/homeworks/files`, homeworkData).pipe(
      map((response: { status: any; data: any }) => response.data)
    );
  }

  saveFile(idLesson): Observable<any> {
    return this.httpClient.get(`/homeworks/files/${idLesson}`).pipe(
      map((response: { status: any; data: any }) => response.data)
    );
  }
}
