import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  public transititionForm: FormGroup;
  public currentClassYear: number;
  public currentClassTitle: string;
  public isNotEmpty = true;
  public isActive = true;
  public isCurrentYear = true;
  public filterParams = [this.isNotEmpty, this.isCurrentYear, this.isActive];
  public singleInputEnabled = false;
  public controlIndexes: number[] = [];
  panelOpenState = [];

  constructor( private newYearTransitition: NewYearService) {  }

  ngOnInit() {
    this.createTransititionForm();
    this.newYearTransitition.getAllClasesInfo().subscribe(
      data => {
        this.allClasses = data;
        console.log(data);
        data.forEach(
              (schoolClass, i) => {
                this.controlIndexes.push(i);
                this.panelOpenState.push(false);
                const newInput = new FormControl(
                  {value: '', disabled: false},
                  [Validators.pattern('^([1-9]|1[0-2])-[А-Я]{1}$'),
                  this.classExistValidator(this.allClasses, schoolClass.classYear)]);
                (this.transititionForm.controls.newClassTitle as FormArray).push(newInput);
                this.addFormControls();
              }
            );
          }
      );

    }

  // focusToFormControl(event) {
  //   this.currentClassYear = +event.target.dataset.classYear;
  //   this.currentClassTitle = event.target.dataset.classTitle;
  // }

  createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      newClassTitle: new FormArray([]),     // rename
      editTitleSwitcher: new FormArray([]),    // rename
      skipClassSwitcher: new FormArray([])  // rename
    });
  }

  addFormControls() {
    // const newInput = new FormControl(
    //   {value: '', disabled: false},
    //   [Validators.pattern('^([1-9]|1[0-2])-[А-Я]{1}$'), this.classExistValidator(this.allClasses)]);
    // (this.transititionForm.controls.newClassTitle as FormArray).push(newInput);

    const newCheckbox = new FormControl(false);
    (this.transititionForm.controls.editTitleSwitcher as FormArray).push(newCheckbox);

    const skipClass = new FormControl(false);
    (this.transititionForm.controls.skipClassSwitcher as FormArray).push(skipClass);
  }
  get newClassTitle() { return this.transititionForm.get('newClassTitle'); }
  get editTitleSwitcher() { return this.transititionForm.get('editTitleSwitcher'); }
  get skipClassSwitcher() { return this.transititionForm.get('skipClassSwitcher'); }

  classExistValidator = (allClasses: ClassData[], classYear?: number) => {
    return (control: FormControl) => {
      if (this.currentClassTitle === control.value) {
        return {title_dublicate: {valid: false}};
      }
      const error = allClasses.some(
         (item) => {
          return (item.classYear === classYear + 1 && item.className === control.value); }
       );
      if (error )  {
        return { class_exist: {valid: false}  };
      }
      return null;
    };
  }

  unclockInput(event, index: number, curTitle: string, id: string) {
    const input = document.getElementById(id);
    input.classList.toggle('locked');
    if (!input.classList.contains('locked')) { input.focus(); }
    // event.target.nextElementSibling.classList.toggle('active');
  }

  skipClass(event, index: number, id: number) {
    console.log('skip event');
    // console.log(index, id);
    // console.log((this.transititionForm.controls.autoClassTitle as FormArray).controls[index]);
    // console.log((this.transititionForm.controls.newClassTitle as FormArray).controls[index]);
    const classCard = event.target.parentNode.parentNode.parentNode;

    // event.target.parentNode.parentNode.parentNode.classList.toggle('locked');
    // event.target.parentNode.parentNode.parentNode.classList.toggle('active');
    // const checked = (this.transititionForm.controls.skipClassCheckbox as FormArray).controls[index].value;
    const input = (this.transititionForm.controls.newClassTitle as FormArray).controls[index];
    const name = (this.transititionForm.controls.newClassTitle as FormArray).controls[index].value;
    classCard.classList.toggle('locked');
    if (classCard.classList.contains('locked')) {
      input.reset({ value: name, disabled: true });
      } else {input.reset({ value: name, disabled: false }); }
  }

  formSubmit() {
    const formData = [];
    const cards = document.querySelectorAll('mat-card');
    cards.forEach(
      (matCard, index) => {
        const controlOrder = matCard.querySelectorAll('input')[0].dataset.order;
        const skipClass = ((this.transititionForm.controls.skipClassSwitcher as FormArray).controls[controlOrder].value);
        const input = matCard.querySelectorAll('input')[1];
        if (!skipClass) {
        formData.push(
            {
              curTitle: input.dataset.classTitle,
              newTitle: input.value,
              newYear: +input.dataset.classYear + 1,
              id: input.id

            }
          );
        }      }
    );
    if (this.transititionForm.status === 'VALID') {
      console.log(this.transititionForm);
      this.newYearTransitition.transitClasses(formData);
    }
  }
}
