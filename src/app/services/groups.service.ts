import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group-data.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`/classes`)
    .pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  addGrup(group: Group) {
    if (Number(group.id)) {
      return this.http.put<Group>(`/classes/` + group.id, group)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
    } else {
       return this.http.post<Group>(`/classes/`, group)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
    }
  }
}
