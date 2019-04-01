import { Component, OnInit } from '@angular/core';
import { NewYearService } from "../../services/new-year.service";
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})
export class NewYearComponent implements OnInit {

  public classes=[];
  public classesNamesList=[];
  public pupilList=[]; 
  public transititionForm: FormGroup;
  constructor( private newYearTransitition: NewYearService ) {  }

  ngOnInit() {

  /*сreate reactive form*/ 
    this.createTransititionForm();

  
  this.newYearTransitition.getClasses()
    .subscribe(data => {this.classes = data
      .filter((item) => { 
        this.classesNamesList.push(item.className);
        return item.isActive && item.numOfStudents>0 })
      console.log(this.classesNamesList);  
      this.classes.forEach( 
        (schoolClass, index)=> {
          if (index < this.classes.length-1) this.addNewClassTitleInput();
          this.newYearTransitition.getPupilList(schoolClass.id)
           .subscribe( data => schoolClass["pupilList"]=data);
          console.log(schoolClass);
        }
      )
    } );
    
}

  /**
   * Method creates reactive form for login component
   */

  createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      "newClassTitle": new FormArray([
        new FormControl("", [
          Validators.pattern("^([1-9]|1[0-2])-[А-Я]{1}$")
        ])
      ])
    });
  }

  addNewClassTitleInput(){
    (<FormArray>this.transititionForm.controls["newClassTitle"]).push(new FormControl("", Validators.pattern("^([1-9]|1[0-2])-[А-Я]{1}$")));
  }

  get newClassTitle() { return this.transititionForm.get('newClassTitle'); } 
  formSubmit() {
    let query=[];
    let queryPut=[];
    if(this.transititionForm.status==="VALID") {
      this.transititionForm.value.newClassTitle
        .forEach( (item, index) => {
          if (item) { 
            query.push(
            {
              "className": item, 
              "classYear": this.classes[index].classYear+1
            });
            queryPut.push({
              "oldClassId": this.classes[index].id
            });
          }  
        })
      console.log('queryPOST', query); 
    }
   
    console.log('Form data', this.transititionForm.value.newClassTitle)
    this.newYearTransitition.transitClasses(query).subscribe(
      res => {res.data
        .forEach(
          (item, index) => {queryPut[index]["newClassID"]=item.id}
        )
        console.log('queryPUT', queryPut);
         
      }
    );
     
    this.newYearTransitition.bindPupils(queryPut).subscribe();

  }



}
