import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group-data.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  readonly API_URL: string = 'http://35.228.220.5:8080/classes'

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.API_URL)
    .pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }
}
