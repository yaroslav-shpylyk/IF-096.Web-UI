import { Injectable } from '@angular/core';
import { ClassService } from './class.service';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SubjectService } from './subject.service';
import { SubjectData } from '../models/subject-data';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private classService: ClassService, private subjectService: SubjectService) { }

  public getClassesWithSubjects(): Observable<any> {
    const subjects = [];
    return this.subjectService.getSubjects()
      .pipe(
        map((result: SubjectData[]) => {
          result.forEach(item => subjects.push({
            subjectId: item.subjectId,
            subjectName: item.subjectName
          }));
          return result.map(item => {
            return this.classService.getClasses('active', `${item.subjectId}`);
          });
        }),
        switchMap(result => combineLatest(...result)),
        map(result => {
          return result.map((item, index) => {
            return {
              ...subjects[index],
              classes: item
            };
          });
        })
      );

  }
}
