import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewYearService } from '../../services/new-year.service';
import { ClassInfo } from '../../models/class-info';
import { ClassCardComponent } from './class-card/class-card.component';

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
  public panelOpenState: boolean[] = [];

  @ViewChildren('classCard') classCards: QueryList<ClassCardComponent>;
  @ViewChildren('classCard', {read: ElementRef}) private MatCard: ElementRef[];


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

  formSubmit() {
    const formData = [];
    this.MatCard.forEach( (element, i) => {
      if (!this.classCards._results[i].skipClassSwitcher.value) {
        element.nativeElement.childNodes[0].classList.add('locked', 'transited');
      }
    });

    this.classCards.forEach( el => {
      if (!el.skipClassSwitcher.value) {
        formData.push(
          {
            curTitle: el.curClass.className,
            newTitle: el.newTitleField.value,
            newYear: +el.curClass.classYear + 1,
            id: el.curClass.id
          }
        );
      }
    } );
    if (this.transititionForm.status === 'VALID') {
      console.log(formData);
      // this.newYearTransitition.transitClasses(formData);
    }
  }
}
