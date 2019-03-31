import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TeachersService } from '../admin-panel/teachers/teachers.service';

@Injectable()
export class TeachersStorageService {
  constructor(
    private httpClient: HttpClient,
    private teachersService: TeachersService
  ) {}

  getTeachers() {
    this.httpClient
      .get('http://35.228.220.5:8080/teachers')
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

  getTeacher(id) {
    // let cachedTeachers = this.teachersService.getTeachers();
    
    // if (cachedTeachers.length) {
    //   for (let teacher of cachedTeachers) {
    //     if (teacher.id == id) {
    //       console.log('est')
    //       return teacher;
    //     }
    //   }
    // }
    // console.log("net")

    this.httpClient
      .get(`http://35.228.220.5:8080/teachers/${id}`)
      .pipe(
        map(response => {
          let teacher = response['data'];
          teacher['dateOfBirth'] = new Date (teacher['dateOfBirth']).toLocaleString().split(',')[0];
          if (!teacher['avatar']) {
            teacher['avatar'] =
            'https://png.pngtree.com/svg/20161212/f93e57629c.svg';
          }
          // console.log(teacher)
          return teacher;
        })
      )
      .subscribe(
        teacher => {
          this.teachersService.setTeacher(teacher);
        },
        error => console.log(error)
      );
  }

  updateTeacher(id, teacher) {
    console.log(`da  ${teacher}`)
    
    return this.httpClient.put(`http://35.228.220.5:8080/admin/teachers/${id}`, teacher);
  }
}
