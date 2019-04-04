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
  public transititionForm: FormGroup;
  public currentYear: number;
  panelOpenState = [];

  constructor( 
    private newYearTransitition: NewYearService,
    private http: HttpClient ) {  }


  ngOnInit() {

    this.createTransititionForm();
 
      this.newYearTransitition.getAllClasesInfo().subscribe(
        data => {
          data.forEach( 
            (schoolClass, index)=> {
              if(schoolClass.isActive && schoolClass.numOfStudents>0){
                this.classes.push(schoolClass); 
                this.panelOpenState.push(false);
                this.addNewClassTitleInput();
              }
            }  
          )
        }
      );       
}

  /**
   * Method creates form for new titles
   */
  createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      "newClassTitle": new FormArray([])
    });
  }

  addNewClassTitleInput(){
    let newInput=new FormControl("", [Validators.pattern("^([1-9]|1[0-2])-[А-Я]{1}$")]);
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
}
