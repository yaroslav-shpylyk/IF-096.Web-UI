import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StudentChartMarks } from '../../models/student-chart-marks';
import { AvgMarkResponse } from '../../models/avg-mark-response';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private subjectChartData$: Subject<StudentChartMarks[]> = new Subject();
  private studentChartData$: Subject<AvgMarkResponse[]> = new Subject();
  constructor() { }
  public getSubjectChartData(): Observable<StudentChartMarks[]> {
    return this.subjectChartData$;
  }
  public updateSubjectChartData(data): void {
    this.subjectChartData$.next(data);
  }
  public getStudentChartData(): Observable<AvgMarkResponse[]> {
    return this.studentChartData$;
  }
  public updateStudentChartData(data): void {
    this.studentChartData$.next(data);
  }
}
