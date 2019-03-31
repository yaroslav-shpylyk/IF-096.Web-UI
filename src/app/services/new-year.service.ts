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
  private url:string='http://35.228.220.5:8080/classes';
  
  constructor( private http: HttpClient ) { }


   /**
   * Method use current token to get list of classes
   * @returns - list of classes
   */
  public getClasses(): Observable<Class[]> {
    return this.http.get(this.url, {observe: 'response'}).pipe(
      map((response: any)=>{
        return response.body.data;
      }),
      catchError((error: any) => {
        return error;  
      })
    )


  }



   }
