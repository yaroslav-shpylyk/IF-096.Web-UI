import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClassListService {

  constructor(private http: HttpClient) { }

  /*get classList() {
    return this.http.get<String[]>('url');
  }*/
}
