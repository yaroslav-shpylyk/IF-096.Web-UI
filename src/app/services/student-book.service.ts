import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StudentBookData } from '../models/student-book-data';

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
  public getStudentBook(): Observable<StudentBookData[]> {
    return this.http.get('/diaries', {params: {weekStartDate: this.inputDate}})
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
}
