import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Subject, Observable, forkJoin } from 'rxjs';
import { TeacherData } from '../models/teacher-data';

@Injectable()
export class TeachersStorageService {
  public modalsId: number;
  public editMode: boolean;
  public defaultAvatar = 'assets/default-avatar.svg';
  teachersChanged = new Subject();

  constructor(private httpClient: HttpClient) {}

  /**
   * Method fetches from server an array of teachers
   * and passes it to the subject teachersChanged.
   */
  getTeachers(): void {
    this.httpClient
      .get('/teachers')
      .pipe(
        map((response: { status: any; data: TeacherData[] }) => {
          const teachers = response.data;
          for (const teacher of teachers) {
            if (!teacher.avatar) {
              teacher.avatar = this.defaultAvatar;
            }
          }
          return teachers;
        })
      )

      .subscribe(
        teachers => {
          this.teachersChanged.next(teachers);
        },
        error => console.log(error)
      );
  }

  getTeacherS(): Observable<TeacherData[]> {
    return this.httpClient
      .get('/teachers')
      .pipe(map((result: { status: any; data: TeacherData[] }) => result.data));
  }

  /**
   * Method fetches from the server a single
   * teacher object by provided id.
   * @param id - number representing id of requested teacher.
   * @returns - object representing teacher.
   */
  getTeacher(id): Observable<TeacherData> {
    return this.httpClient.get(`/teachers/${id}`).pipe(
      map((response: { status: any; data: TeacherData }) => {
        const teacher = response.data;
        teacher.dateOfBirth = teacher.dateOfBirth
          .split('-')
          .reverse()
          .join('.');
        if (!teacher.avatar) {
          teacher.avatar = this.defaultAvatar;
        }
        return teacher;
      })
    );
  }

  /**
   * Method gets id of the teacher to be changed and an object
   * with new values. Then passes it to the server in put request.
   * @param id - number representing id of the teacher.
   * @param teacher - object with new values.
   * @returns - object representing teacher.
   */
  updateTeacher(id, updTeacher): Observable<TeacherData> {
    return this.httpClient.put(`/admin/teachers/${id}`, updTeacher).pipe(
      map((response: { status: any; data: TeacherData }) => {
        const teacher = response.data;
        if (!teacher.avatar) {
          teacher.avatar = this.defaultAvatar;
        }
        return teacher;
      })
    );
  }

  /**
   * Method gets id of the teacher to be deleted
   * and passes it to the server in patch request.
   * @param id - number representing id of the teacher.
   * @returns - object representing deleted teacher.
   */
  deleteTeacher(id): Observable<TeacherData> {
    return this.httpClient.patch<any>(`/users/${id}`, { observe: 'response' });
  }

  /**
   * Method gets object representing a teacher to be created
   * and passes it to the server in post request
   * @param newTeacher - object with new values.
   * @returns - object representing newly created teacher.
   */
  addTeacher(newTeacher): Observable<any> {
    return this.httpClient.post(`/teachers`, newTeacher, {
      observe: 'response'
    });
  }

  /**
   * Method fetches journal by given id, groups subjects by classes
   * and returns the result.
   * @param teacherId - number representing id of the journal.
   * @returns - an array of objects with subjects grouped by classes.
   */
  getTeacherJournal(teacherId): Observable<any> {
    return this.httpClient.get(`/journals/teachers/${teacherId}`).pipe(
      map((response: { status: any; data: any }) => {
        const journalData = {};
        for (const item of response.data) {
          if (journalData[item.idClass]) {
            journalData[item.idClass].subjectName.push(item.subjectName);
            continue;
          }
          journalData[item.idClass] = {
            className: item.className,
            subjectName: [item.subjectName],
            academicYear: item.academicYear
          };
        }

        return Object.values(journalData);
      })
    );
  }

  getTeacherSubjectsClasses(teacherId): Observable<any> {
    return this.httpClient.get(`/journals/teachers/${teacherId}`).pipe(
      map((response: { status: any; data: any }) => {
        const data = { subjects: [], classes: [] };
        for (const item of response.data) {
          if (!data.subjects.includes(item.subjectName)) {
            data.subjects.push(item.subjectName);
          }
          if (!data.classes.includes(item.className)) {
            data.classes.push(item.className);
          }
        }
        return data;
      })
    );
  }

  getTeacherSubjectsClasses2(teacher): Observable<any> {
    return this.httpClient.get(`/journals/teachers/${teacher.id}`).pipe(
      map((response: { status: any; data: any }) => {
        teacher.subjects = [];
        teacher.classes = [];
        for (const item of response.data) {
          if (!teacher.subjects.includes(item.subjectName)) {
            teacher.subjects.push(item.subjectName);
          }
          if (!teacher.classes.includes(item.className)) {
            teacher.classes.push(item.className);
          }
        }
        return teacher;
      })
    );
  }

  varvara() {
    this.getTeacherS().subscribe(arr => {
      console.log(arr);
      const data = [];
      for (const teacher of arr) {
        data.push(this.getTeacherSubjectsClasses2(teacher));
      }

      forkJoin(data).subscribe(teachers => {
        // for (const teac of teachers) {
        //   if (!teac.subjects.includes) {
        //     teac.subjects.push(teac.subjectName);
        //   }
        // }
        console.log(teachers);
      });
    });
  }
}
