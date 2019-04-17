import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { MarkRequestOptions } from '../models/mark-request-options';
import { map, tap } from 'rxjs/operators';
import { MarkResponse } from '../models/mark-response';
import { AvgMarkResponse } from '../models/avg-mark-response';
import { Student } from '../models/student';
import { SubjectData } from '../models/subject-data';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) { }

  /**
   * Method gets marks filtered by params
   * @param options - Object of params, which we use as query with request
   */
  public getMarks(options?: MarkRequestOptions): Observable<MarkResponse[]> {
    let requestParams;
    if (options !== undefined && Object.keys(options).length) {
      const optionKeys = Object.keys(options);
      const formattedOptions = optionKeys
        .map(item => `${item}=${options[item]}`)
        .join('&');
      requestParams = `?${formattedOptions}`;
    } else {
      requestParams = '';
    }
    return this.http.get<{status: any, data: MarkResponse[]}>(`/marks${requestParams}`)
      .pipe(
        map(result => result.data)
      );
  }
  public getProgressMarks(options: MarkRequestOptions, studentsInfo: Student[]): Observable<any> {
    return options.student_id.length === 1 ?
      this.getStudentProgressMarks(options, studentsInfo) :
      this.getStudentsProgressMarks(options, studentsInfo);
  }
  private getStudentProgressMarks(options, studentsInfo): Observable<any> {
    return this.getMarks(options)
      .pipe(
        map(result => {
          return [{
            studentInfo: studentsInfo[0],
            marks: result.map(item => {
              {
                return {
                  date: this.formatToShortDate(this.createDateObject(item.x)),
                  mark: item.y
                };
              }
            })
          }];
        })
      );
  }
  private getStudentsProgressMarks(options: MarkRequestOptions, studentsInfo: Student[]): Observable<any> {
    let uniqueDates: string[] = [];
    const studentsId: number[] = [];
    return forkJoin(options.student_id.map(item => {
      studentsId.push(item);
      options.student_id = [item];
      return this.getMarks(options);
    }))
      .pipe(
        tap(result => {
          const sortedDates = this.getSortedDates(result);
          uniqueDates = this.getUniqueDates(sortedDates);
        }),
        map(result => {
          return result.map((student, studentIndex) => {
            const newMarks = this.formNewMarks(student, uniqueDates);
            return {
              studentInfo: studentsInfo[studentIndex],
              marks: newMarks
            };
          });
        })
      );
  }
  public getAvgMarks(options: MarkRequestOptions): Observable<AvgMarkResponse[]> {
    const optionKeys = Object.keys(options);
    const formattedOptions = optionKeys
      .map(item => `${item}=${options[item]}`)
      .join('&');
    const requestParams = `?${formattedOptions}`;
    return this.http.get<{status: any, data: AvgMarkResponse[]}>(`/marks/avg${requestParams}`)
      .pipe(
        map(result => result.data)
      );
  }
  public getAvgStudentProgressMarks(options: any): Observable<any> {
    return this.getAvgMarks(options);
  }
  public getAvgProgressMarks(options: any, subjectsNames: SubjectData[], studentsInfo: Student[]): Observable<any> {
    const requestOptions = options;
    return forkJoin(requestOptions.student_id.map(item => {
      requestOptions.student_id = [item];
      return this.getAvgMarks(requestOptions);
    })).pipe(
      map(result => result.map(student => {
        const markInfo = student.filter(subject => subject.subjectName === subjectsNames[0].subjectName)[0];
        return {
          date: '',
          mark: markInfo !== undefined ? markInfo.avgMark : 0
        };
      })),
      map(result => {
        return result.map((mark, index) => {
          return {
            marks: [mark],
            studentInfo: studentsInfo[index]
          };
        });
      })
    );
  }
  private createDateObject(dateParams: number[]): Date {
    const [year, month, day]: number[] = dateParams;
    return new Date(year, month, day);
  }
  private getSortedDates(data: any): string[] {
    const dates = [];
    for (const student of data) {
      for ( const mark of student ) {
        const date: Date = this.createDateObject(mark.x);
        dates.push(date);
      }
    }
    return dates
      .sort((itemA, itemB) => itemA.getTime() - itemB.getTime())
      .map(item => this.formatToShortDate(item));
  }
  private getUniqueDates(dates: string[]): string[] {
    const uniqueDates = [];
    dates.forEach(item => {
      if (!uniqueDates.includes(item)) {
        uniqueDates.push(item);
      }
    });
    return uniqueDates;
  }
  private formatToShortDate(date: Date): string {
    return date
      .toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('-');
  }
  private formNewMarks(studentMarks: MarkResponse[], allDates: string[]): any {
    const newMarks = allDates.map(item => {
      return {
        date: item,
        mark: 0
      };
    });
    for (const mark of studentMarks) {
      const markDate = this.formatToShortDate(this.createDateObject(mark.x));
      const index = newMarks.findIndex(item => item.date === markDate);
      newMarks[index].mark = mark.y;
    }
    return newMarks;
  }
}
