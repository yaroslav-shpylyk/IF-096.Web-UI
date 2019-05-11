import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HomeworkFile } from '../models/homework-file-data';
import { HomeworkData } from '../models/homework-data-data';

@Injectable({
  providedIn: 'root'
})
export class HomeworkStorageService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Method takes an object with new values for the homework and
   * sends it to the server via PUT request.
   * @param homeworkData - object with new values for homework.
   */
  saveHomework(homeworkData: HomeworkData): Observable<any> {
    return this.httpClient.put(`/homeworks/files`, homeworkData).pipe(
      map((response: { status: any; data: any }) => {
        return response.data;
      })
    );
  }

  /**
   * Method takes an id of the lesson to be fetched and
   * gets it from the server via GET request.
   * @param idLesson - id of the lesson to be fetched.
   * @returns - object representing a homework.
   */
  saveFile(idLesson: number): Observable<HomeworkFile> {
    return this.httpClient
      .get(`/homeworks/files/${idLesson}`)
      .pipe(map((response: { status: any; data: any }) => response.data));
  }
}
