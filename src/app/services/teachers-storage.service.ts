import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TeachersStorageService {
  public modalsId: number;
  constructor(private httpClient: HttpClient) {}

  public defaultAvatar = 'https://png.pngtree.com/svg/20161212/f93e57629c.svg';
  teachersChanged = new Subject();
  /**
   * Method fetches from server an array of teachers
   * and passes it to the teachersService.
   */
  getTeachers() {
    this.httpClient
      .get<any>('/teachers')
      .pipe(
        map(response => {
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

  getTeache() {
    return this.httpClient.get<any>('/teachers').pipe(
      map(response => {
        const teachers = response.data;
        for (const teacher of teachers) {
          if (!teacher.avatar) {
            teacher.avatar = this.defaultAvatar;
          }
        }
        return teachers;
      })
    );
  }

  /**
   * Method gets id, pulls an array of locally stored teachers from
   * teachersService service and serches through it requested object.
   * If no math found it makes a request to the server by
   * provided id and then stores it to the teachersService service.
   * @param id - number representing id of requested teacher.
   */
  getTeacher(id) {
    return this.httpClient.get<any>(`/teachers/${id}`).pipe(
      map(response => {
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
   * @returns - Observable with updated data.
   */
  updateTeacher(id, updTeacher) {
    return this.httpClient.put<any>(`/admin/teachers/${id}`, updTeacher).pipe(
      map(response => {
        const teacher = response.data;
        if (!teacher.avatar) {
          teacher.avatar = this.defaultAvatar;
        }
        return teacher;
      })
    );
  }

  deleteTeacher(id) {
    return this.httpClient.patch<any>(`/users/${id}`, { observe: 'response' });
  }

  /**
   * Method gets object representing a teacher to be created
   * and passes it to the server in post request
   * @param newTeacher - object with new values.
   * @returns - Observable with values of newly created teacher.
   */
  addTeacher(newTeacher) {
    return this.httpClient.post(`/teachers`, newTeacher);
  }

  getTeacherJournal(teacherId) {
    return this.httpClient.get<any>(`/journals/teachers/${teacherId}`).pipe(
      map(response => {
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
}
