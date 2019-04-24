import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClassData } from '../models/class-data';
import { ClassFromStream } from '../models/class-from-stream';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http: HttpClient) { }

  /**
   * Method gets data about classes
   * @param type - Type of classes(all, active, inActive)
   * @param subjectNumber - Id of the subject
   * @returns - Array with classes data
   */
  public getClasses(type: string, subjectNumber?: string): Observable<ClassData[]> {
    const subjectId = subjectNumber || '';
    return this.http.get(`/classes?subjectId=${subjectId}`)
      .pipe(
        map((result: {status: any, data: ClassData[] | null}) => {
          switch (type) {
            case 'all': {
              return result.data;
            }
            case 'active': {
              return result.data.filter(currClass => currClass.isActive);
            }
            case 'inActive': {
              return result.data.filter(currClass => !currClass.isActive);
            }
          }
        })
      );
  }

  /**
   * Method return all students on class stream and number of students per each class
   * @param stream - Number of stream
   * @returns - Array with objects of className and number of students in it
   */
  public getClassesByStream(stream?: number | undefined): Observable<any> {
    return this.getClasses('active')
      .pipe(
        map((result: ClassData[]) => {
          if (stream === undefined) {
            stream = this.getRandomStream(result);
          }
          const studentsStream: ClassFromStream[] = result
            .filter(item => parseInt(item.className, 10) === stream)
            .map(item => {
            return {
              id: item.id,
              className: item.className,
              numOfStudents: item.numOfStudents
            };
          });
          return {
            studentsData: studentsStream,
            allStudents: studentsStream.reduce((sum, studentClass) => sum + studentClass.numOfStudents , 0)
          };
        })
      );
  }

  /**
   * Method generates a random number of stream with classes
   * @param classes - Array with active classes
   * @returns - Number of stream
   */
  private getRandomStream(classes: ClassData[]): number {
    const streams: number[] = [];
    classes.forEach(item => {
      const streamNumber = parseInt(item.className, 10);
      if (!streams.includes(streamNumber) && item.numOfStudents) {
        streams.push(streamNumber);
      }
    });
    return streams[Math.floor(Math.random() * streams.length)];
  }
}
