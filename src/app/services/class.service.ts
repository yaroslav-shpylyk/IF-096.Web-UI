import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClassService {
  
  constructor(private http: HttpClient) { }

  /**
     * Method returns data with all classes from backend
  */

  getClasses(): Observable<any> {
    return this.http.get(`/classes`)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
}