import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Class } from "../models/class-info";


@Injectable({
  providedIn: 'root'
})
export class NewYearService {
  private url:string='http://35.228.220.5:8080';
  

  public classes=[];
  public classesNamesList=[];
  
  constructor( private http: HttpClient ) { }


   /**
   * Method return list of classes
   * @returns - list of classes
   */
  public getClasses(): Observable<Class[]> {
    return this.http.get(`${this.url}/classes`, {observe: 'response'})
    .pipe(
      map((response: any)=>{
        return response.body.data;
      }),
      catchError((error: any) => {
        return error;  
      })
    )
  }

   /**
   * Method use  class id to get list of pupils
   * @returns - list of pupils
   */
  public getPupilList(classId:number): Observable<any> {
    return this.http.get(`${this.url}/students/classes/${classId}`, {observe: 'response'})
    .pipe(
      map((response: any)=>{
        return response.body.data;
      }),
      catchError((error: any) => {
        return error;  
      })
    )
  }


  public transitClasses(data:any):Observable<any>{
    return this.http.post(`${this.url}/students/transition`, data, {observe: 'response'})
    .pipe(
      map((response: any)=> {
        return response.body;
      }),
      catchError((error:any) => {
        return error;
      })
    )
  }


  public bindPupils(data: any): Observable<any> {
    return this.http.put(`${this.url}/students/transition`, data);
  }



   }
