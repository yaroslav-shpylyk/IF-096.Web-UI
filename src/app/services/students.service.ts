import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClassData} from '../models/class-data';
import { ClassService } from './class.service';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient, private classService: ClassService) { }

 /**
  * Method returns data with students from backend,where id is class
  */

  getStudents(id): Observable<any> {
    return this.http.get(`/students/classes/${id}`).
      pipe(map((res: any) => res.data));
  }

  /**
   * Method returns students
   * @returns - Number of students
   */
  public getNumberOfStudents(type: string): Observable<number> {
    return this.classService.getClasses(type)
      .pipe(
        map((result: ClassData[]) => {
          return result.reduce((students, currClass) => students + currClass.numOfStudents, 0);
        })
      );
  }
}

