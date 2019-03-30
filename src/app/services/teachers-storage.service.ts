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

      .subscribe(
        teachers => {
          
          this.teachersService.setTeachers(teachers);
        },
        error => console.log(error)
      );
  }
}
