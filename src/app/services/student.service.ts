import { Injectable } from '@angular/core';
import { ClassService } from './class.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassData } from '../models/class-data';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private classService: ClassService) { }

  /**
   * Method returns active students
   * @returns - Number of active classes
   */
  public getStudents(type: string): Observable<number> {
    return this.classService.getClasses(type)
      .pipe(
        map((result: ClassData[]) => {
          return result.reduce((students, currClass) => students + currClass.numOfStudents, 0);
        })
      );
  }
}
