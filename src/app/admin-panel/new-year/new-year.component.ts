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
  public activeClasses: ClassInfo[] = [];
  public transititionForm: FormGroup;
  public currentClassYear: number;
  public currentClassTitle: string;
  public isNotEmpty = true;
  public isCurrentYear = true;
  public filterHasResults = false;
  public controlIndexes: number[] = [];
  public panelOpenState: boolean[] = [];
  public transitedCards: ClassCardComponent[] = [];
  @ViewChildren('classCard') classCards: QueryList<ClassCardComponent>;

  constructor(
    private newYearTransitition: NewYearService) { }

  ngOnInit() {
    this.createTransititionForm();
    this.newYearTransitition.getAllClasesInfo().subscribe(
      data => {
        this.allClasses = data;
        this.activeClasses = this.allClasses.filter(
          curClass => curClass.isActive
        );
        this.activeClasses.forEach(
          (schoolClass, i) => {
            this.controlIndexes.push(i);
            this.panelOpenState.push(false);
            const newInput = new FormControl(
              {value: '', disabled: false},
              [Validators.pattern('^([1-9]|1[0-2])-[А-Я]{1}$'),
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
    this.classCards.forEach( el => {
      if (!el.isCardLock) {
        formData.push(
          {
            curTitle: el.curClass.className,
            newTitle: el.newTitleField.value,
            newYear: +el.curClass.classYear + 1,
            id: el.curClass.id
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
                // el.curClass.isActive = false;
              }
            );
          }
        }
      );
    }
  }

  /**
   * Return indexes of filtereted classes
   */
  get filteredindexes() {
    const curDate = new Date();
    const year = (curDate.getMonth() < 12 && curDate.getMonth() > 7) ? curDate.getFullYear() : curDate.getFullYear() - 1;
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
        }
      }
    );
  }
}
