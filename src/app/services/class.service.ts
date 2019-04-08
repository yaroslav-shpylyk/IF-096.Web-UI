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

  public getClasses(type: string): Observable<any> {
    return this.http.get('/classes')
      .pipe(
        map((result: any) => {
          switch (type) {
            case 'all': {
              return result.data;
            }
            case 'active': {
              return result.data.filter(currClass => currClass.isActive);
            }
            case 'inActive': {
              return result.data.filter(currClass => !currClass.isActive);
            }
          }
        })
      );
  }
}