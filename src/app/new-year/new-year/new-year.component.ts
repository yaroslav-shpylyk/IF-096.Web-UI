import { Component, OnInit } from '@angular/core';
import { NewYearService } from "../../services/new-year.service";
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})

export class NewYearComponent implements OnInit {
  public classes=[];
  public classesNamesList=[];
  public transititionForm: FormGroup;
  public currentYear: number;
  
  panelOpenState = [];

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
          this.classesNamesList.push(
             { 
              'classTitle': schoolClass['className'],
              'classYear': schoolClass['classYear']
             }
            );
          if(schoolClass.isActive && schoolClass.numOfStudents>0){
            this.classes.push(schoolClass); 
            this.panelOpenState.push(false);
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
      "newClassTitle": new FormArray([])
    });
  }

  addNewClassTitleInput(){
    let newInput=new FormControl("", 
    [
      Validators.pattern("^([1-9]|1[0-2])-[А-Я]{1}$"),
      classNameValidator
    ]
  );
    (<FormArray>this.transititionForm.controls["newClassTitle"]).push(newInput);
  }

  get newClassTitle() { return this.transititionForm.get('newClassTitle'); } 

  formSubmit() {
    let query=[];
    let queryPut=[];
    if(this.transititionForm.status==="VALID") {   
    this.newYearTransitition.transitClasses(this.transititionForm.value.newClassTitle, this.classes); 
    }
    console.log('Form data', this.transititionForm.value.newClassTitle)
  }

  ngInput(event:any) {
    this.currentYear=event.target.previousElementSibling.querySelector('.currentYear').textContent;
    console.log(this.classes);     
    console.log(this.classesNamesList);
  }
}

function classNameValidator(control: FormGroup ) {
  let newClassTitle = control.value;
  this.classes.filter(
    (element) => {element.classYear==(this.currentYear+1);}
  ).some((elem)=>{elem.classTitle==control.value});
  
  if (this.classes.indexOf('!') != -1){
    return {
      nameError: { parsedName: newClassTitle}
    }
  }
  return null;
}