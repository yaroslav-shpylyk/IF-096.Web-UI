import { Injectable } from '@angular/core';
import { MarkService } from '../../services/mark.service';
import { MarksRequestOptions } from '../../models/marks-request-options';
import { combineLatest, Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MarkData } from '../../models/mark-data';
import { Student } from '../../models/student';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private markService: MarkService) { }
  public getProgressMarks(options: MarksRequestOptions, studentsInfo: Student[]): Observable<any> {
    if (options.student_id.length === 1) {
      return this.getStudentProgressMarks(options, studentsInfo);
    } else {
      return this.getStudentsProgressMarks(options, studentsInfo);
    }
  }
  private getStudentProgressMarks(options, studentsInfo): Observable<any> {
    return this.markService.getMarks(options)
      .pipe(
        map(result => {
          const marks = [{
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
          return marks;
        })
      );
  }
  private getStudentsProgressMarks(options: MarksRequestOptions, studentsInfo: Student[]): Observable<any> {
    let uniqueDates: string[] = [];
    const studentsId: number[] = [];
    return combineLatest(options.student_id.map(item => {
      studentsId.push(item);
      options.student_id = [item];
      return this.markService.getMarks(options);
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
  private createDateObject(dateParams: number[]): Date {
    const [year, month, day] = dateParams;
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
  private formNewMarks(studentMarks: MarkData[], allDates: string[]): any {
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
