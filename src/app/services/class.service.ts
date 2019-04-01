import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassResponse } from '../models/class-response';
import { ClassData } from '../models/class-data';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http: HttpClient) { }

  /**
   * Method gets data about classes
   * @returns - Array with classes data
   */
  public getClasses(): Observable<ClassData[]> {
    return this.http.get('/classes')
      .pipe(
        map((result: ClassResponse) => result.data)
      );
  }

  /**
   * Method returns active classes data
   * @returns - Array with active classes
   */
  public getActiveClasses(): Observable<ClassData[]> {
    return this.getClasses()
      .pipe(
        map((result: ClassData[]) => {
          return result.filter(currClass => currClass.isActive);
        })
      );
  }
}
