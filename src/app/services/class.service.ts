import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly url: string = 'http://35.228.220.5:8080';
  constructor(private http: HttpClient) { }

  /**
     * Method returns data with all classes from backend
  */

  getClasses(): Observable<any> {
    return this.http.get(`${this.url}/classes`)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
}