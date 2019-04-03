import { Component, OnInit } from '@angular/core';
import { NewYearService } from "../../services/new-year.service";
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Observable,  forkJoin } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { mergeMap, map } from 'rxjs/operators';

function classNameValidator(control: FormGroup) {
  let classes = control.value; 
  if (classes.indexOf('!') != -1){
    return {
      nameError: { parsedName: classes}
    }
  }
  return null; (6)
}



@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})
export class NewYearComponent implements OnInit {

  public classes=[];
  public activeClasses=[];
  public classesNamesList=[];
  public transititionForm: FormGroup;

  constructor( 
    private newYearTransitition: NewYearService,
    private http: HttpClient ) {  }


    ngOnInit() {

  /*сreate reactive form*/ 
  this.createTransititionForm();
  
  this.newYearTransitition.getAllClasesInfo().subscribe(
    data => {
      data.forEach( 
        (schoolClass, index)=> {
          this.classesNamesList.push(schoolClass['className']);
          if(schoolClass.isActive && schoolClass.numOfStudents>0){
            this.classes.push(schoolClass);
            this.addNewClassTitleInput();
          }
        }  
      )
      console.log(this.classesNamesList);
    }
  );       
}

  /**
   * Method creates reactive form for login component
   */
  createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      "newClassTitle": new FormArray([
      ])
    });
  }

  addNewClassTitleInput(){
    (<FormArray>this.transititionForm.controls["newClassTitle"]).push(new FormControl("", 
      [
        Validators.pattern("^([1-9]|1[0-2])-[А-Я]{1}$"),
        classNameValidator
      ]
    ));
  }
  get newClassTitle() { return this.transititionForm.get('newClassTitle'); } 
  
  formSubmit() {
    let query=[];
    let queryPut=[];
    if(this.transititionForm.status==="VALID") {   
    this.newYearTransitition.transitClasses(this.transititionForm.value.newClassTitle, this.classes); 
    }


    // this.transititionForm.value.newClassTitle
    //     .forEach( (item, index) => {
    //       if (item) { 
    //         query.push(
    //         {
    //           "className": item, 
    //           "classYear": this.classes[index].classYear+1
    //         });
    //         queryPut.push({
    //           "oldClassId": this.classes[index].id
    //         });
    //       }  
    //     })
    //   console.log('queryPOST', query); 
    // }
   
    console.log('Form data', this.transititionForm.value.newClassTitle)
    // this.newYearTransitition.transitClasses(query).subscribe(
    //   res => {res.data
    //     .forEach(
    //       (item, index) => {queryPut[index]["newClassID"]=item.id}
    //     )
    //     console.log('queryPUT', queryPut);
    //     this.newYearTransitition.bindPupils(queryPut).subscribe();   
    //   }
      
    // );
  }



}
