import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription} from 'rxjs';
import { catchError, map, mergeMap, delay, switchMap } from "rxjs/operators";
// import { Class } from "../models/class-info";

@Injectable({
  providedIn: 'root'
})
export class NewYearService {
 
  constructor( private http: HttpClient ) { }

  public getAllClasesInfo():Observable <any>{
    return this.getClasses().pipe(
      map(
        classList => { classList.forEach(
          (singleClass) =>  {
            if(singleClass['numOfStudents']>0)
            this.getPupilList(singleClass['id'])
            .subscribe( pupilList => singleClass['pupilList']=pupilList )
          });
        return classList; }
      )    
    )
  }  
  
   /**
   * Method return list of classes
   * @returns - list of classes
   */
  public getClasses(): Observable<any> {
    return this.http.get(`/classes`, {observe: 'response'})
    .pipe(
      map((response: any)=>{
        console.log(response.body.data)
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
    return this.http.get(`/students/classes/${classId}`, {observe: 'response'})
    .pipe(
      map((response: any)=>{
        return response.body.data;
      }),
      catchError((error: any) => {
        return error;  
      })
    )
  }

  public transitClasses(formData, classes){
    let request=this.getTransitRequest(formData, classes);
    this.createClasses(request.transitClassesQuery).subscribe(
      res => {res.data
       .forEach( 
         (newClass, index) => {request.bindPupilsQuery[index]["newClassID"]=newClass.id} 
        )
       this.bindPupils(request.bindPupilsQuery).subscribe();   
       console.log(request.bindPupilsQuery);    
      }      
     )
  }

   // this.newYearTransitition.transitClasses(query).subscribe(
    //   res => {res.data
    //     .forEach(
    //       (item, index) => {queryPut[index]["newClassID"]=item.id}
    //     )
    //     console.log('queryPUT', queryPut);
    //     this.newYearTransitition.bindPupils(queryPut).subscribe();   
    //   }
      
    // );
 



  public getTransitRequest(formData, classes){
    let transitClassesQuery=[];
    let bindPupilsQuery=[];
    formData.forEach(
      (item, index) => {
        if(item) {transitClassesQuery.push(
          {
            "className": item, 
            "classYear": classes[index].classYear+1
          });
          bindPupilsQuery.push({"oldClassId": classes[index].id});
        }
      }
    )
    return {
      "transitClassesQuery": transitClassesQuery,
      "bindPupilsQuery": bindPupilsQuery
    }
  }



  public createClasses(data:any):Observable<any>{
    return this.http.post(`/students/transition`, data, {observe: 'response'})
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
    console.log(data);
    return this.http.put(`/students/transition`, data);
  }



   }
