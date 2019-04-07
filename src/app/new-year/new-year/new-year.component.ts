import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewYearService } from '../../services/new-year.service';
import { ClassData } from '../../models/class-info';

@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})

export class NewYearComponent implements OnInit {

  public allClasses: ClassData[] = [];
  public activeClasses: ClassData[] = [];
  public transititionForm: FormGroup;
  public currentClassYear: number;
  public currentClassTitle: string;
  panelOpenState = [];

  constructor( private newYearTransitition: NewYearService) {  }

  ngOnInit() {
    this.createTransititionForm();
    this.newYearTransitition.getAllClasesInfo().subscribe(
      data => {
        data.forEach(
          (schoolClass) => {
              this.allClasses.push(schoolClass);
              if (schoolClass.isActive && schoolClass.numOfStudents > 0) {
                this.activeClasses.push(schoolClass);
                this.panelOpenState.push(false);
                this.addNewClassTitleInput();
                }
              }
            );

          }
      );
  }

  focusToFormControl(event) {
    this.currentClassYear = +event.target.dataset.classYear;
    this.currentClassTitle = event.target.dataset.classTitle;
  }


  createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      newClassTitle: new FormArray([])
    });
  }

  classExistValidator = (allClasses: ClassData[]) => {
    return (control: FormControl) => {
      if (this.currentClassTitle === control.value) {
        return {title_dublicate: {valid: false}};
      }
      const error = allClasses.some(
         (item) => (item.classYear === this.currentClassYear + 1 && item.className === control.value)
       );
      if (error )  {
        return { class_exist: {valid: false}  };
      }
      return null;
    };
  }

  addNewClassTitleInput() {
    const newInput = new FormControl('', [
      Validators.pattern('^([1-9]|1[0-2])-[А-Я]{1}$'),
      this.classExistValidator(this.allClasses)]);
    (this.transititionForm.controls.newClassTitle as FormArray).push(newInput);
  }
  get newClassTitle() { return this.transititionForm.get('newClassTitle'); }

  formSubmit() {
    if (this.transititionForm.status === 'VALID') {
    this.newYearTransitition.transitClasses(this.transititionForm.value.newClassTitle, this.activeClasses);
    }
  }
}
