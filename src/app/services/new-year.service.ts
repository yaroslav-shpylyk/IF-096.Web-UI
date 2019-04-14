import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClassInfo } from '../models/class-info';
import { Student } from '../models/student';


@Injectable({
  providedIn: 'root'
})
export class NewYearService {

  constructor( private http: HttpClient ) { }

 /**
  * Method return list of classes with pupils
  * @returns - list of classes
  */

  public getAllClasesInfo(): Observable <ClassInfo[]> {
    return this.getClasses().pipe(
      map(
        classList => { classList.forEach(
          (singleClass) =>  {
            if (singleClass.numOfStudents > 0) {
              this.getPupilList(singleClass.id)
              .subscribe( pupilList => singleClass.pupilList = pupilList );
            }
          }
        );
                       return classList; }
      )
    );
  }

  /**
   * Method create new classes with new titles for the next year and bind pupils to them
   * @returns list of classes
   * @param   formData object that contain new titles for classes
   * @param   classes  classes data
   */
  public transitClasses(formData) {
    const request = this.getTransitRequest(formData);
    this.createClasses(request.transitClassesQuery).subscribe(
      res => {res.data
       .forEach(
         (newClass, index) => {request.bindPupilsQuery[index].newClassID = newClass.id; }
        );
              this.bindPupils(request.bindPupilsQuery).subscribe();
      }
     );
  }

  /**
   * Method return list of classes
   * @returns list of classes
   */
  public getClasses(): Observable<any> {
    return this.http.get(`/classes`, {observe: 'response'})
    .pipe(
      map((response: any) => {
        return response.body.data as ClassInfo;
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
  public getPupilList(classId: number): Observable<any> {
    return this.http.get(`/students/classes/${classId}`, {observe: 'response'})
    .pipe(
      map((response: any) => {
        return response.body.data as Student;
      }),
      catchError((error: any) => {
        return error;
      })
    );
  }


  /**
   * Method generate requests for creating classes and pupils binding methods
   * @returns object that contain requests
   * @param newTitles object that contain new titles for classes
   * @param classes object with classes data
   */
  public getTransitRequest(formData) {
    const transitClassesQuery = [];
    const bindPupilsQuery = [];
    formData.forEach(
      (item) => {
        if (item) {transitClassesQuery.push(
          {
            className: item.newTitle,
            classYear: item.newYear
          });
                   bindPupilsQuery.push({oldClassId: item.id});
        }
      }
    );
    return {
      transitClassesQuery,
      bindPupilsQuery
    };
  }


  /**
   * adds new classes based on currently classes with new year and name
   * @returns responce that contain id's for new classes
   * @param req  objects with classes info
   */
  public createClasses(req: any): Observable<any> {
    return this.http.post(`/students/transition`, req, {observe: 'response'})
    .pipe(
      map((response: any) => {
        return response.body;
      }),
      catchError((error: any) => {
        return error;
      })
    );
  }

  /**
   * binds students to new classes, deactivate previous year classes
   * @returns responce that contain id's for new classes
   * @param req  objects with id's for classes (old and new id's)
   */
  public bindPupils(req: any): Observable<any> {
    return this.http.put(`/students/transition`, req);
  }
}
