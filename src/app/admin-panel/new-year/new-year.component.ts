import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewYearService } from '../../services/new-year.service';
import { ClassInfo } from '../../models/class-info';
import { ClassCardComponent } from './class-card/class-card.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})

export class NewYearComponent implements OnInit {

  public allClasses: ClassInfo[] = [];
  public activeClasses: ClassInfo[] = [];
  public transititionForm: FormGroup;
  public isNotEmpty = true;
  public isCurrentYear = true;
  public controlIndexes: number[] = [];
  public transitedCards: ClassCardComponent[] = [];
  @ViewChildren('classCard') classCards: QueryList<ClassCardComponent>;

  constructor(
    private snackBar: MatSnackBar,
    private newYearTransitition: NewYearService) { }

  ngOnInit() {
    this.createTransititionForm();
    this.newYearTransitition.getClasses().subscribe(
      data => {
        this.allClasses = data;
        this.activeClasses = this.allClasses.filter(
          curClass => curClass.isActive
        );
        this.activeClasses.forEach(
          (schoolClass, i) => {
            this.controlIndexes.push(i);
            const newInput = new FormControl(
              {value: this.newTitle(schoolClass.className), disabled: false},
              [Validators.pattern('(^[1-7][(]([1-9]|1[0-2])-[А-Я]{1}[)]$)|(^([1-9]|1[0-2])-[А-Я]{1}$)'),
              this.classTitleValidator(this.allClasses, schoolClass.classYear, schoolClass.className)]);
            (this.transititionForm.controls.newClassTitle as FormArray).push(newInput);
          }
        );
      }
    );
  }

  /**
   * Сreate reactive form for classes transitition
   */
  createTransititionForm(): void {
    this.transititionForm = new FormGroup({
      newClassTitle: new FormArray([]),
    });
  }
  get newClassTitle() { return this.transititionForm.get('newClassTitle'); }

  /**
   * Title validation for new class
   * @param allClasses ClassInfo[] - Array of objects with data about classes
   * @param classYear number - current class year
   * @param classTitle string - current class title
   * @returns - return FormControl with validation error or null
   */
  classTitleValidator = (allClasses: ClassInfo[], classYear: number, curClassTitle: string) => {
    return (control: FormControl) => {
      if (curClassTitle === control.value) {
        return {title_dublicate: {valid: false}};
      }
      const existError = allClasses.some(
         (item) => {
          return (item.classYear === classYear + 1 && item.className === control.value); }
      );
      if (existError) {
        return { class_exist: {valid: false} };
      }

      if (control.value !== '') {
        const curClassNameParts = curClassTitle.split(/[-(]/);
        const classNameParts = control.value.split(/[-(]/);
        if (classNameParts.length !== curClassNameParts.length) {
          if (classNameParts.length <= curClassNameParts.length ) {
            if (+classNameParts[0] <= +curClassNameParts[1]) { return {error_number: {valid: false}}; }
          } else {
              if (+classNameParts[1] < +curClassNameParts[0]) { return {error_number: {valid: false}}; }
            }
          } else {
          if (curClassNameParts.some(
            (item, index)  => {
            return +item >= +classNameParts[index] && index < classNameParts.length - 1; } )) {
            return {error_number: {valid: false} };
          }
        }
      }
      return null;
    };
  }

  formSubmit() {
    const formData = [];
    this.classCards.forEach( el => {
      if (!el.isCardLock) {
        formData.push(
          {
            className: el.newTitleField.value,
            classYear: +el.curClass.classYear + 1,
            id: el.curClass.id,
            isActive: true,
            numOfStudents: 0
          }
        );
        this.transitedCards.push(el);
      }
    } );
    if (this.transititionForm.status === 'VALID') {
      this.newYearTransitition.transitClasses(formData).subscribe(
        (status) => {
          if (status === 201) {
            this.transitedCards.forEach (
              el => {
                el.isClassTransited = true;
                el.isCardLock = true;
              }
            );
            this.displaySnackBar(
              `Виконано. Переведено класів: ${formData.length}`,
              'popup-success'
            );
          } else {
            this.displaySnackBar(
              `Помилка. Сервер відхилив запит`,
              'popup-error'
            );
          }
        }
      );
    }
    this.transitedCards.forEach (
      el => {
        el.isClassTransited = true;
        el.isCardLock = true;
      }
    );
  }

  /**
   * Display popup message after classes transition with status
   */
  displaySnackBar(message: string, styleClass: string): void {
    const config = new MatSnackBarConfig();
    config.panelClass = [styleClass];
    config.duration = 4000;
    config.verticalPosition = 'bottom';
    this.snackBar.open(message, null, config);
  }

  /**
   * Return indexes of filtereted classes and reset input fields in form
   */
  get filteredindexes(): number[] {
    const year = this.currentYear;
    const isCurrentYear = (item) => this.activeClasses[item].classYear === year;
    const isNotEmpty = (item) => this.activeClasses[item].numOfStudents > 0;
    const filterParams = [];

    if (this.isNotEmpty) {
      filterParams.push(isNotEmpty);
    }
    if (this.isCurrentYear) {
      filterParams.push(isCurrentYear);
    }

    return this.controlIndexes.filter(
      (item) => {
        if ( filterParams.every(func => func(item))) {
          return true;
        } else {
          const input = (this.transititionForm.controls.newClassTitle as FormArray).controls[item];
          input.reset({ value: input.value, disabled: true });
        }
      }
    );
  }

  /**
   * Return current educational year
   */
  get currentYear(): number {
    const curDate = new Date();
    const year = (curDate.getMonth() < 12 && curDate.getMonth() > 7) ? curDate.getFullYear() : curDate.getFullYear() - 1;
    return year;
  }

  /**
   * Generate new title for class based on current title
   * @param curTitle string - current title of class
   * @returns string - new class title for next year
   */

  newTitle(curTitle: string): string {
    const classNameParts = curTitle.split(/[-(]/);
    if ( classNameParts.length > 2) {
      return (+classNameParts[1] + 1 > 11) ? '' : `${+classNameParts[0] + 1}(${+classNameParts[1] + 1}-${classNameParts[2]}`;
    } else {
      return (+classNameParts[0] + 1 > 11) ? '' : (+classNameParts[0] + 1) + '-' + classNameParts[1];
    }
  }
}
