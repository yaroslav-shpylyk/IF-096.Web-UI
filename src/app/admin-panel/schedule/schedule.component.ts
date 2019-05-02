import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import { ScheduleData } from '../../models/schedule-data';
import { ClassData } from '../../models/class-data';
import { SubjectData } from '../../models/subject-data';
import { LessonData } from '../../models/lesson-data';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],

  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ScheduleComponent implements OnInit {
  scheduleData: ScheduleData;
  messageData = '';
  messageClass: string;
  hasEmptyDay = false;

  frmSchedule: FormGroup;
  arrClassList: Array<ClassData>;
  arrSubjectsList: Array<SubjectData>;
  selectClassMsg = 'Виберіть клас*';
  dateTermStartMsg = 'Дата початку семестру*';
  dateTermEndMsg = 'Дата закінчення семестру*';

  weekDayName = [
    {legendDay: 'Понеділок', dailySubjects: 'mondaySubjects'},
    {legendDay: 'Вівторок', dailySubjects: 'tuesdaySubjects'},
    {legendDay: 'Середа', dailySubjects: 'wednesdaySubjects'},
    {legendDay: 'Четвер', dailySubjects: 'thursdaySubjects'},
    {legendDay: 'П`ятниця', dailySubjects: 'fridaySubjects'},
    {legendDay: 'Субота', dailySubjects: 'saturdaySubjects'}
  ];
  emittedDays = {
    mondaySubjects: null,
    tuesdaySubjects: null,
    wednesdaySubjects: null,
    thursdaySubjects: null,
    fridaySubjects: null,
    saturdaySubjects: null
  };

  constructor(
    private frmBld: FormBuilder,
    private classService: ClassService,
    private subjectsService: SubjectService,
    private scheduleService: ScheduleService,
    private adapter: DateAdapter<any>,
  ) { }

  ngOnInit() {
    this.classService.getClasses('active').subscribe(data => {
      this.arrClassList = data;
    });
    this.subjectsService.getSubjects().subscribe(data => {
      this.arrSubjectsList = data;
    });
    this.adapter.setLocale('uk');
    this.initForm();
  }

  /** Method initializes the initial state of the form */
  initForm() {
    this.frmSchedule = this.frmBld.group({
      dateTermStart: [''],
      dateTermEnd: [''],
      selectClass: ['', Validators.required]
    });

    const dateValidators: ValidatorFn[] = [
      Validators.required,
      this.DateValidator
    ];
    this.frmSchedule.get('dateTermStart').setValidators(dateValidators);
    this.frmSchedule.get('dateTermEnd').setValidators(dateValidators);
  }

  /**
   * Method is a validator for the start and the end date of semester
   * @param control - the control to which it is tied
   * @returns - object of the type ValidationErrors if a validation error occurred,
   * or null if validation was successful
   */
  private DateValidator(control: FormControl): ValidationErrors {
    let dateStart: Date;
    let errorMsg: string;
    if (control === control.parent.get('dateTermStart')) {
      dateStart = new Date();
      errorMsg = 'Дата початку семестру не може бути в минулому';
    } else {
      dateStart = new Date(control.parent.get('dateTermStart').value);
      errorMsg = 'Дата закінчення семестру не може раніше його початку';
    }
    const dateValue = new Date(control.value);
    if (dateValue.getTime() < dateStart.getTime()) {
      return {invalidDate: errorMsg};
    }
    return null;
  }

  /**
   * Method gets subjects that are related to the selected class
   * @param classId - Id of selected class
   */
  selectedClass(classId: number) {
    this.scheduleService.getSubjects(classId).subscribe(
      data => { /*this.arrSubjectsList = data;*/ console.log(data); },
      error => { this.messageClass = 'error-msg'; this.showMessage(error); }
    );
    this.scheduleService.getSchedule(classId).subscribe(
      data => { this.scheduleData = data; console.log(data); },
      error => { this.messageClass = 'error-msg'; this.showMessage(error); }
    );
  }

  /**
   * Method gets the schedule for each day from the child component
   * @param event - Data for the daily schedule
   * @param dailySubjects - Daily schedule name
   */
  onAddDailySubjects(event: FormArray, daySubjects: string): void {
    this.emittedDays[daySubjects] = event;
  }

  /**
   * The method checks the data in the control for validity
   * @param cntrName - Control's name
   * @returns true if control got focus and data in the control is not valid
   */
  isInputInvalid(cntrName: string): boolean {
    const control = this.frmSchedule.controls[cntrName];
    const result = control.invalid && control.touched;
    return result;
  }

  /**
   * The method checks the form for validity and then handle form data and generates data for creating a week schedule
   */
  onSubmit() {
    const controls = this.frmSchedule.controls;
    /* Check the form for validity */
    if (this.frmSchedule.invalid) {
      Object.keys(controls).forEach(
        controlName => controls[controlName].markAsTouched()
      );
      window.scrollTo(0, 0);
      return;
    }
    /* Handling form data */
    this.scheduleData.startOfSemester =
      this.frmSchedule.controls.dateTermStart.value.format('YYYY-MM-DD');
    this.scheduleData.endOfSemester =
      this.frmSchedule.controls.dateTermEnd.value.format('YYYY-MM-DD');

    this.scheduleData.classId = this.frmSchedule.controls.selectClass.value.id;
    this.scheduleData.className = this.frmSchedule.controls.selectClass.value;

    Object.keys(this.emittedDays).forEach(dailySubjects => {
      if (!this.addDailyData(dailySubjects)) {
        this.hasEmptyDay = true;
        this.messageClass = 'error-msg';
        this.showMessage('Заповніть розклад для всіх робочих днів');
        return;
      }
      this.scheduleData[dailySubjects] = this.addDailyData(dailySubjects);
    });

    if (!this.hasEmptyDay) {
      this.saveSchedule(this.frmSchedule.controls.selectClass.value.id, this.scheduleData);
    }
    this.hasEmptyDay = false;
  }

  /**
   * The method generates data for the daily schedule
   * @param dailySubjects - Daily schedule name
   * @returns - Data for the daily schedule
   */
  private addDailyData(dailySubjects: string): LessonData[] | boolean {
    const dailyLesson: LessonData[] = [];
    for (let i = 0; i < (this.emittedDays[dailySubjects].value.length - 1); i++) {
      dailyLesson.push({
        lessonNumber: `${i + 1}`,
        subjectId: this.emittedDays[dailySubjects].value[i].firstGroup.subjectId,
        subjectName: this.emittedDays[dailySubjects].value[i].firstGroup.subjectName,
        subjectDescription: this.emittedDays[dailySubjects].value[i].firstGroup.subjectDescription
      });

      if ('secondGroup' in this.emittedDays[dailySubjects].value[i]) {
        dailyLesson.push({
          lessonNumber: `${i + 1}`,
          subjectId: this.emittedDays[dailySubjects].value[i].secondGroup.subjectId,
          subjectName: this.emittedDays[dailySubjects].value[i].secondGroup.subjectName,
          subjectDescription: this.emittedDays[dailySubjects].value[i].secondGroup.subjectDescription
        });
      }
    }
    if (dailyLesson.length === 0 && dailySubjects !== 'saturdaySubjects') {
      return false;
    }
    return dailyLesson;
  }

  /**
   * Method saves schedule for the class by id
   * @param classId - Id of class
   * @param data - Array with schedule data
   */
  private saveSchedule(classId: number, data: ScheduleData): void {
    this.scheduleService.saveSchedule(classId, data).subscribe(
        (data: ScheduleData) => {
          this.messageClass = 'success-msg';
          this.showMessage('Розклад успішно збережено');
          console.log(data);
        },
        error => { this.messageClass = 'error-msg'; this.showMessage(error); }
    );
  }

  /**
   * The method shows a message for the user about success or error
   * @param message - Message for the user
   */
  private showMessage(message: string) {
    this.messageData = message;
    const itself: ScheduleComponent = this;
    setTimeout( () => { itself.messageData = ''; }, 2000);
  }
}
