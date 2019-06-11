import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewYearService } from '../../services/new-year.service';
import { ClassData } from '../../models/class-data';
import { ClassCardComponent } from './class-card/class-card.component';
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatDialogConfig } from '@angular/material';
import { StatisticsComponent } from '../../admin-panel/new-year/statistics/statistics.component';

@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})

export class NewYearComponent implements OnInit {

  allClasses: ClassData[] = [];
  activeClasses: ClassData[] = [];
  transititionForm: FormGroup;
  isNotEmpty = true;
  isCurrentYear = true;
  filteredClasses: { classData?: ClassData, control: FormControl}[] = [];
  transitedCards: ClassCardComponent[] = [];
  @ViewChildren('classCard') classCards: QueryList<ClassCardComponent>;

  constructor(
    public dialog: MatDialog,
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
        this.filterClasses();
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
   * Add new FormControl with validators to FormArray
   * @param singleClass ClassData[] - objects with data about current class
   */
  addNewTitleInput(singleClass: ClassData): void {
    const newInput = new FormControl(
      {value: this.newTitle(singleClass.className), disabled: false},
      [Validators.pattern('(^[1-7][(]([1-9]|1[0-2])-[А-Я]{1}[)]$)|(^([1-9]|1[0-2])-[А-Я]{1}$)'),
      this.classTitleValidator(this.allClasses, singleClass.classYear, singleClass.className)]);
    (this.transititionForm.controls.newClassTitle as FormArray).push(newInput);
    this.filteredClasses.push( {classData: singleClass, control: newInput} );
  }

  /**
   * Title validation for new class
   * @param allClasses ClassData[] - Array of objects with data about classes
   * @param classYear number - current class year
   * @param curClassTitle string - current class title
   * @returns - return FormControl with validation error or null
   */
  classTitleValidator = (allClasses: ClassData[], classYear: number, curClassTitle: string) => {
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
        const newNameParts = control.value.split(/[-(]/);
        if (newNameParts.length !== curClassNameParts.length) {
          if (newNameParts.length <= curClassNameParts.length ) {
            if (+newNameParts[0] <= +curClassNameParts[1]) { return {error_number: {valid: false}}; }
          } else {
              if (+newNameParts[1] < +curClassNameParts[0]) { return {error_number: {valid: false}}; }
            }
          } else {
          if (curClassNameParts.some(
            (item, index)  => {
            return +item >= +newNameParts[index] && index < newNameParts.length - 1; })) {
            return {error_number: {valid: false} };
          }
        }
      }
      return null;
    };
  }

  formSubmit() {
    const formData: ClassData[] = [];
    this.classCards.forEach( classCard => {
      if (!classCard.isCardLock) {
        formData.push(
          {
            className: classCard.newTitleField.value,
            classYear: +classCard.curClass.classYear + 1,
            id: classCard.curClass.id,
            isActive: true,
            numOfStudents: 0,
            classDescription: ''
          }
        );
        this.transitedCards.push(classCard);
      }
    } );
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
   *  Filter active classses and generate according to this object with filtereted classes and array of FormControls
   */
  filterClasses(): void {
    const year = this.currentYear;
    const isCurrentYear = (singleClass) => singleClass.classYear === year;
    const isNotEmpty = (singleClass) => singleClass.numOfStudents > 0;
    const filterParams = [];

    if (this.isNotEmpty) {
      filterParams.push(isNotEmpty);
    }
    if (this.isCurrentYear) {
      filterParams.push(isCurrentYear);
    }

    this.activeClasses.filter(
      (singleClass) => {
        const posSinglClassInFiltered = this.filteredClasses.map( filteredClass => filteredClass.classData.id ).indexOf(singleClass.id);
        if ( filterParams.every(func => func(singleClass))) {
          if (posSinglClassInFiltered === -1) {
            this.addNewTitleInput(singleClass);
          }
          return true;
        } else {
          if (posSinglClassInFiltered !== -1) {
            this.filteredClasses.splice(posSinglClassInFiltered, 1);
            (this.transititionForm.controls.newClassTitle as FormArray).removeAt(posSinglClassInFiltered);
          }
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

  /**
   * Generate new title for class based on current title
   * @param curTitle string - current title of class
   */
  showStatistic(): void {
    const config = new MatDialogConfig();
    config.panelClass = ['full-screen-modal'];
    config.data = {
      allClasses: this.allClasses
    };
    this.dialog.open(
      StatisticsComponent,
      config
    );
  }
}
