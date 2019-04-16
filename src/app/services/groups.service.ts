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

  /**
   * Method returns list of classes
   * @returns - array, his elements are objects with data class
   */
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`/classes`)
    .pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  /**
   * Method send changes in class or creates a new class
   * @param group - data about the class that we want to change or create
   * @returns - object with two properties: "status" - response status; "data" - data about the class that we want to change or create
   */
  addGrup(group: Group) {
    if (Number(group.id)) {
      return this.http.put<Group>(`/classes/` + group.id, group);
    } else {
      return this.http.post<Group>(`/classes/`, group);
    }
  }
}
