import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, mergeMap, mergeAll, switchMap, merge } from 'rxjs/operators';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { element, elementStart } from '@angular/core/src/render3';


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly url: string = 'http://35.228.220.5:8080';
  constructor(private http: HttpClient) { }
  getClasses(): Observable<any> {
    return this.http.get(`${this.url}/classes`)
      .pipe(map((res: any) => {

        return res.data;
      }));
  }

  


  getOneStudent(id) {
    return this.http.get(`${this.url}/students/classes/${id}`).
      pipe(map((res: any) => res.data))
  }

  // = this.http.get(`/students/classes/${result}`)

  // getActiveClasses(): Observable<any> {
  //   return this.http.get(`${this.url}/classes`)
  //     .pipe(map((res: any) => {
  //       console.log(" getActiveClasses",res.data);
  //       let ActiveClasses: Array<any> = res.data.filter((elem: any) =>elem.isActive=true);
  //       return ActiveClasses;
  //     }))
  // }

  // getNotActiveClasses(): Observable<any> {
  //   return this.http.get(`${this.url}/classes`)
  //     .pipe(map((res: any) => {
  //       console.log("getNotActiveClasses",res.data);
  //       let NotActiveClasses: Array<any> = res.data.filter((elem: any) =>elem.isActive=false);

  //       return NotActiveClasses;
  //     }))
  // }

}