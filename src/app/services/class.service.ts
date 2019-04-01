import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly url: string = 'http://35.228.220.5:8080';
  constructor(private http: HttpClient) { }

  getActiveClasses(): Observable<any> {
    return this.http.get(`${this.url}/classes`)
      .pipe(map((res: any) => {
        let ActiveClasses: Array<any> = res.data.filter((elem: any) =>elem.isActive=true);
        return ActiveClasses;
      }))
  }

  getNotActiveClasses(): Observable<any> {
    return this.http.get(`${this.url}/classes`)
      .pipe(map((res: any) => {
        let NotActiveClasses: Array<any> = res.data.filter((elem: any) =>elem.isActive=false);
        return NotActiveClasses;
      }))
  }

}