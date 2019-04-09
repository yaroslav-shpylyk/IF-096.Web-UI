import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * Method gets data from backend
   * @param endpoint - Endpoint
   * @returns - Array with data
   */
  public getData(endpoint: string): Observable<any[]> {
    return this.http.get(endpoint)
      .pipe(
        map((result: {status: any, data: any[]}) => result.data)
      );
  }
}
