import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TeachersService } from '../admin-panel/teachers/teachers.service';
import { Observable } from 'rxjs';


@Injectable()
export class TeachersStorageService {
  constructor(
    private httpClient: HttpClient,
    private teachersService: TeachersService
  ) {}

  public defaultAvatar = 'https://png.pngtree.com/svg/20161212/f93e57629c.svg';

  /**
   * Method fetches from server an array of teachers
   * and passes it to the teachersService.
   */
  getTeachers() {
    this.httpClient
      .get('/teachers')
      .pipe(
        map(response => {
          let teachers = response['data'];
          for (let teacher of teachers) {
            if (!teacher['avatar']) {
              teacher['avatar'] =
                'https://png.pngtree.com/svg/20161212/f93e57629c.svg';
            }
          }
          return teachers;
        })
      )

      .subscribe(
        teachers => {
          this.teachersService.setTeachers(teachers);
        },
        error => console.log(error)
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
    // let cachedTeachers = this.teachersService.getTeachers();

    // if (cachedTeachers.length) {
    //   for (let teacher of cachedTeachers) {
    //     if (teacher.id == id) {
    //       return teacher;
    //     }
    //   }
    // }
    return this.httpClient.get<any>(`/teachers/${id}`)
    .pipe(
      map(response => {
        const teacher = response.data;
        teacher.dateOfBirth = teacher.dateOfBirth.split('-').reverse().join('.');
        if (!teacher.avatar) {
          teacher.avatar = this.defaultAvatar;
        }
        return teacher;
      })
    );
    // .subscribe(
    //   teacher => {
    //     this.teachersService.setTeacher(teacher);
    //   },
    //   error => console.log(error)
    // );
  }

  /**
   * Method gets id of the teacher to be changed and an object
   * with new values. Then passes it to the server in put request.
   * @param id - number representing id of the teacher.
   * @param teacher - object with new values.
   * @returns - Observable with updated data.
   */
  updateTeacher(id, teacher) {
    return this.httpClient.put(`/admin/teachers/${id}`, teacher);
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
}
