import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewYearService } from '../../services/new-year.service';
import { ClassInfo } from '../../models/class-info';

@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})

export class NewYearComponent implements OnInit {

  public allClasses: ClassInfo[] = [];
  public transititionForm: FormGroup;
  public currentClassYear: number;
  public currentClassTitle: string;
  public isNotEmpty = true;
  public isActive = true;
  public isCurrentYear = true;
  public filterHasResults = false;
  public controlIndexes: number[] = [];
  public panelOpenState:boolean[] = [];

  constructor(
    private newYearTransitition: NewYearService) { }

  ngOnInit() {
    this.createTransititionForm();
    this.newYearTransitition.getAllClasesInfo().subscribe(
      data => {
        this.allClasses = data;
        data.forEach(
              (schoolClass, i) => {
                this.controlIndexes.push(i);
                this.panelOpenState.push(false);
                const newInput = new FormControl(
                  {value: '', disabled: false},
                  [Validators.pattern('^([1-9]|1[0-2])-[А-Я]{1}$'),
                  this.classTitleValidator(this.allClasses, schoolClass.classYear, schoolClass.className)]);
                (this.transititionForm.controls.newClassTitle as FormArray).push(newInput);
                this.addFormControls();
              }
        );
      }
    );
  }

  createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      newClassTitle: new FormArray([]),
      editTitleSwitcher: new FormArray([]),
      skipClassSwitcher: new FormArray([])
    });
  }

  addFormControls() {
    const newCheckbox = new FormControl(false);
    (this.transititionForm.controls.editTitleSwitcher as FormArray).push(newCheckbox);

    const skipClass = new FormControl(false);
    (this.transititionForm.controls.skipClassSwitcher as FormArray).push(skipClass);
  }
  get newClassTitle() { return this.transititionForm.get('newClassTitle'); }
  get editTitleSwitcher() { return this.transititionForm.get('editTitleSwitcher'); }
  get skipClassSwitcher() { return this.transititionForm.get('skipClassSwitcher'); }

  /**
   * Title validation for new class
   * @param allClasses ClassInfo[] - Array of objects with data about classes
   * @param classYear number - current class year
   * @param classTitle string - current class title
   * @returns - return FormControl with validation error or null
   */
  classTitleValidator = (allClasses: ClassInfo[], classYear: number, classTitle: string ) => {
    return (control: FormControl) => {
      if (classTitle === control.value) {
        return {title_dublicate: {valid: false}};
      }
      const error = allClasses.some(
         (item) => {
          return (item.classYear === classYear + 1 && item.className === control.value); }
      );
      if (error) {
        return { class_exist: {valid: false} };
      }
      return null;
    };
  }

  /**
   * Makes input with new class title enabled or disabled for editing
   * @param id string - id of input for new title
   */
  editInput(id: string) {
    const input = document.getElementById(id);
    input.classList.toggle('locked');
    if (!input.classList.contains('locked')) { input.focus(); }
  }

  /**
   * Include (exclude) class to (from) request
   * @param id number - index of element from form control
   */
  skipClass(index: number) {
    const input = (this.transititionForm.controls.newClassTitle as FormArray).controls[index];
    const classSkiped = (this.transititionForm.controls.skipClassSwitcher as FormArray).controls[index].value;
    const newTitle = input.value;
    if (!classSkiped) {
      input.reset({ value: newTitle, disabled: true });
    } else {
      input.reset({ value: newTitle, disabled: false });
    }
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
          matCard.classList.add('locked', 'transited');
          for (const element of this.allClasses) {
            if (element.id === Number(input.id)) {
              element.isActive = false;
            }
          }
          (this.transititionForm.controls.skipClassSwitcher as FormArray).controls[controlOrder].value = true;
          formData.push(
            {
              curTitle: input.dataset.classTitle,
              newTitle: input.value,
              newYear: +input.dataset.classYear + 1,
              id: input.id
            }
          );
        }
      }
    );
    if (this.transititionForm.status === 'VALID') {
      this.newYearTransitition.transitClasses(formData);
    }
  }
}