import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Subject, Observable, forkJoin } from 'rxjs';
import { TeacherData } from '../models/teacher-data';

@Injectable()
export class TeachersStorageService {
  public teacherToDisplay: TeacherData;
  public modalsId: number;
  public editMode: boolean;
  public defaultAvatar = 'assets/default-avatar.svg';
  teacherAdded = new Subject();
  teacherEdited = new Subject();
  teacherDeleted = new Subject();

  constructor(private httpClient: HttpClient) {}

  /**
   * Method fetches from server an array of teachers
   * and passes it to the subject teacherAdded.
   */
  getTeachers(): void {
    this.httpClient
      .get('/teachers')
      .pipe(
        map((response: { status: any; data: TeacherData[] }) => {
          const teachers = response.data;
          for (const teacher of teachers) {
            teacher.dateOfBirth = teacher.dateOfBirth
              .split('-')
              .reverse()
              .join('.');
          }
          return teachers;
        })
      )

      .subscribe(
        teachers => {
          const newTeacher = teachers[teachers.length - 1];
          this.teacherAdded.next(newTeacher);
        },
        error => console.log(error)
      );
  }

  /**
   * Method fetches from server an array of teachers
   * and returns it.
   * @returns - array of teachers.
   */
  getTeacherS(): Observable<TeacherData[]> {
    return this.httpClient.get('/teachers').pipe(
      map((response: { status: any; data: TeacherData[] }) => response.data)
    );
  }

  /**
   * Method fetches from server an array of all teachers via
   * getTeacherS method, then makes a request to every single
   * teacher out of array in order to fetch additional data and
   * returns result being an array of teachers with all related data.
   * @returns - array of teachers.
   */
  getTeachersWithClasses() {
    return this.getTeacherS().pipe(
      mergeMap(teachers => {
        const data = [];
        for (const teacher of teachers) {
          teacher.dateOfBirth = teacher.dateOfBirth
            .split('-')
            .reverse()
            .join('.');
          data.push(this.getTeacherSubjectsClasses(teacher));
        }
        return forkJoin(data);
      })
    );
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
        return teacher;
      })
    );
  }

  /**
   * Method gets id of the teacher makes request to the server
   * by getTeacher(id) method, receives teacher related data, then
   * makes another request by the getTeacherJournal(id) method,
   * merges received, groups data and return a new object.
   * @param id - number representing id of the teacher.
   * @returns - object representing teacher.
   */
  getTeacherAndJournal(id) {
    return this.getTeacher(id).pipe(
      mergeMap(teacher => {
        return this.getTeacherJournal(id).pipe(
          map(teacherJournal => {
            teacher.journalData = teacherJournal;
            return teacher;
          })
        );
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
      map((response: { status: any; data: TeacherData }) => response.data)
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

  /**
   * Method takes an object of teacher, makes request to the server by provided teacher's
   * id in order to get additional data such as teacher's classes and subjects
   * supplies initial object with those data (if any) being sorted by classes and subjects.
   * @param teacher - object representing teacher.
   * @returns - object representing teacher.
   */
  getTeacherSubjectsClasses(teacher): Observable<any> {
    return this.httpClient.get(`/journals/teachers/${teacher.id}`).pipe(
      map((response: { status: any; data: any }) => {
        teacher.subjects = [];
        teacher.classes = [];
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
          if (!teacher.subjects.includes(item.subjectName)) {
            teacher.subjects.push(item.subjectName);
          }
          if (!teacher.classes.includes(item.className)) {
            teacher.classes.push(item.className);
          }
        }
        teacher.journalData = Object.values(journalData);
        return teacher;
      })
    );
  }
}
