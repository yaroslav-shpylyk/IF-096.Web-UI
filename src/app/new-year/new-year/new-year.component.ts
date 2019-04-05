import { Component, OnInit } from '@angular/core';
import { NewYearService } from "../../services/new-year.service";
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})

export class NewYearComponent implements OnInit {
  public allClasses=[];
  public activeClasses=[];
  public transititionForm: FormGroup;
  public currentYear: number;
  panelOpenState = [];

  constructor(
    private newYearTransitition: NewYearService) {  }

  
  ngOnInit() {
    this.allClasses=[''];
    this.createTransititionForm();
      this.newYearTransitition.getAllClasesInfo().subscribe(
        data => {
          const Info=data;
          data.forEach( 
            (schoolClass)=> {
              if(schoolClass.isActive && schoolClass.numOfStudents>0){
                this.activeClasses.push(schoolClass); 
                this.panelOpenState.push(false);
                this.addNewClassTitleInput();
              }
            }  
          )
          this.allClasses=Info;
        }
    );
    this.createTransititionForm();
  
}

   createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      "newClassTitle": new FormArray([])
    });
  }

  addNewClassTitleInput(){
    let newInput=new FormControl("", [Validators.pattern("^([1-9]|1[0-2])-[А-Я]{1}$")]);
    (<FormArray>this.transititionForm.controls["newClassTitle"]).push(newInput);  }
  get newClassTitle() { return this.transititionForm.get('newClassTitle'); } 

  formSubmit() {
    if(this.transititionForm.status==="VALID") {   
    this.newYearTransitition.transitClasses(this.transititionForm.value.newClassTitle, this.activeClasses); 
    }
  }
}