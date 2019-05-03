import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClassInfo } from '../models/class-info';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class NewYearService {

  constructor( private http: HttpClient ) { }

  /**
   * Method create new classes with new titles for the next year and bind pupils to them
   * @returns number, status code of binding request
   * @param   formData array of objects that contains info about current classes (with new titles)
   */
  public transitClasses(formData: ClassInfo[]): Observable<number> {
    const request = this.getTransitRequest(formData);
    const subject = new Subject<number>();
    const bindReq: {oldClassId: number, newClassId: number}[] = [];
    this.createClasses(request).subscribe(
      res => {
        let resIndex = 0;
        formData.forEach (item => {
          if (item.className !== '') {
            bindReq.push({oldClassId: item.id, newClassId: res[resIndex].id});
            resIndex++;
          } else {
            bindReq.push({oldClassId: item.id, newClassId: 0});
          }
        });
        this.bindPupils(bindReq).subscribe(
          result => {
            subject.next(result.status.code);
          }
        );
      }
     );
    return subject.asObservable();
  }

  /**
   * Method return list of classes
   * @returns list of all classes
   */
  public getClasses(): Observable<ClassInfo[]> {
    return this.http.get(`/classes`)
    .pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return error;
      })
    );
  }

  /**
   * Method use class id to get list of pupils
   * @returns list of pupils
   * @param classId number, class id
   */
  public getPupilList(classId: number): Observable<Student[]> {
    return this.http.get(`/students/classes/${classId}`)
    .pipe(
      map((response: { status: any, data: any}) => {
        return response.data;
      }),
      catchError((error: any) => {
        return error;
      })
    );
  }

  /**
   * Method generate requests for creating classes
   * @returns object that contain classes info without graduated classes
   * @param   formData array of objects that contains info about current classes (with new titles)
   */
  public getTransitRequest(formData: ClassInfo[]): ClassInfo[] {
    const transitClassesQuery = [];
    formData.forEach(
      (item) => {
        if (item.className !== '') {
          transitClassesQuery.push(item);
        }
      }
    );
    return transitClassesQuery;
  }

  /**
   * adds new classes based on current classes with new year and name
   * @returns responce that contain id's for new classes
   * @param req  objects array with classes info (new class title and new year)
   */
  public createClasses(req: ClassInfo[] ): Observable <ClassInfo[]> {
    return this.http.post(`/students/transition`, req)
    .pipe(
      map((response: { status: any, data: any }) => {
        return response.data;
      }),
      catchError((error: any) => {
        return error;
      })
    );
  }

  /**
   * binds students to new classes, deactivate previous year classes
   * @returns responce that contain id's for new classes
   * @param req  objects array with id's for classes (old and new id's)
   */
  public bindPupils(req: {oldClassId: number, newClassId: number}[]): Observable<any> {
    return this.http.put(`/students/transition`, req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
