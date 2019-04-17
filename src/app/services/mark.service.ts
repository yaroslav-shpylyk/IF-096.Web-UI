import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { MarkRequestOptions } from '../models/mark-request-options';
import { map, tap } from 'rxjs/operators';
import { MarkResponse } from '../models/mark-response';
import { AvgMarkResponse } from '../models/avg-mark-response';
import { Student } from '../models/student';
import { SubjectData } from '../models/subject-data';
import { StudentChartMarks } from '../models/student-chart-marks';
import { MarkData } from '../models/mark-data';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) { }

  /**
   * Method gets marks
   * @param options - Object of params, which we use as query with request
   * @returns - Array of marks
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

  /**
   * Method choose with number of student another method to get marks for single or multiple students
   * @param options - Object with query params
   * @param studentsInfo - Array with info of students
   * @returns - Marks of student(s)
   */
  public getProgressMarks(options: MarkRequestOptions, studentsInfo: Student[]): Observable<StudentChartMarks[]> {
    return options.student_id.length === 1 ?
      this.getStudentProgressMarks(options, studentsInfo) :
      this.getStudentsProgressMarks(options, studentsInfo);
  }

  /**
   * Method gets marks of single student and filter them for progress chart
   * @param options - Object with query params
   * @param studentsInfo - Array with info of students
   * @returns - Marks of student
   */
  private getStudentProgressMarks(options, studentsInfo): Observable<StudentChartMarks[]> {
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

  /**
   * Method gets marks of multiple student and filter them for progress chart
   * @param options - Object with query params
   * @param studentsInfo - Array with info of students
   * @returns - Marks of students
   */
  private getStudentsProgressMarks(options: MarkRequestOptions,
                                   studentsInfo: Student[]): Observable<StudentChartMarks[]> {
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

  /**
   * Method gets avg marks
   * @param options - Object with query params
   * @returns - Array of avg marks
   */
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

  /**
   * Method gets avg mark of subject for multiple students
   * @param options - Object with query params
   * @param subjectsNames - String with subject name
   * @param studentsInfo - Array with students info
   * @returns - Array with avg marks of subject
   */
  public getAvgProgressMarks(options: MarkRequestOptions, subjectsNames: SubjectData[],
                             studentsInfo: Student[]): Observable<StudentChartMarks[]> {
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

  /**
   * Method creates new date object with year, month and day
   * @param dateParams - Array with date parts
   * @returns - New date object
   */
  private createDateObject(dateParams: number[]): Date {
    const [year, month, day]: number[] = dateParams;
    return new Date(year, month, day);
  }

  /**
   * Method sort date objects from min to max and format them to dd-mm-yyyy format
   * @param data - Array with date objects
   * @returns - Array with dates in dd-mm-yyyy format
   */
  private getSortedDates(data: Array<MarkResponse[]>): string[] {
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

  /**
   * Method gets all unique dates
   * @param dates - Array with dates
   * @returns - Array with unique dates
   */
  private getUniqueDates(dates: string[]): string[] {
    const uniqueDates = [];
    dates.forEach(item => {
      if (!uniqueDates.includes(item)) {
        uniqueDates.push(item);
      }
    });
    return uniqueDates;
  }

  /**
   * Method formats dates to dd-mm-yyyy format
   * @param date - Date object
   * @returns - Formatted date
   */
  private formatToShortDate(date: Date): string {
    return date
      .toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('-');
  }

  /**
   * Method compares all dates to unique, then form new array where pushes existing marks and fill with zero mark
   * non-existing dates
   * @param studentMarks - Array with student marks
   * @param allDates - Array with all unique dates
   * @returns - Array of marks for unique dates
   */
  private formNewMarks(studentMarks: MarkResponse[], allDates: string[]): MarkData[] {
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
