import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { ClassService } from "./class.service";
import {StudentsListComponent} from '../admin-panel/students-list/students-list.component'

  
@Injectable()  
export class ClassListResolve implements Resolve<any> {  
  constructor(private classServise: ClassService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {  
    return this.classServise.getActiveClasses()
  }  
}  