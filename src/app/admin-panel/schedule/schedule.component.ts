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
  selectClassMsg = 'Виберіть клас *';
  dateTermStartMsg = 'Дата початку семестру *';
  dateTermEndMsg = 'Дата закінчення семестру *';

  weekDayName = [
    {legendDay: 'Понеділок *', dailySubjectsName: 'mondaySubjects'},
    {legendDay: 'Вівторок *', dailySubjectsName: 'tuesdaySubjects'},
    {legendDay: 'Середа *', dailySubjectsName: 'wednesdaySubjects'},
    {legendDay: 'Четвер *', dailySubjectsName: 'thursdaySubjects'},
    {legendDay: 'П`ятниця *', dailySubjectsName: 'fridaySubjects'},
    {legendDay: 'Субота', dailySubjectsName: 'saturdaySubjects'}
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
      this.arrClassList = data.sort((a: ClassData, b: ClassData) => {
        const aSecondSmbl = Number(a.className.charAt(1));
        const bSecondSmbl = Number(b.className.charAt(1));
        if ( isNaN(aSecondSmbl) && !isNaN(bSecondSmbl) ) { return -1; }
        if ( !isNaN(aSecondSmbl) && isNaN(bSecondSmbl) ) { return 1; }
        if (a.className < b.className) { return -1; }
        if (a.className > b.className) { return 1; }
        return 0;
      });
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
      errorMsg = `Дата повинна бути більшою чим сьогоднішня:
        ${dateStart.getDate()}/${dateStart.getMonth() + 1}/${dateStart.getFullYear()}`;
    } else {
      dateStart = new Date(control.parent.get('dateTermStart').value);
      errorMsg = 'Дата закінчення повинна бути більшою за дату початку семестру';
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
      data => { this.arrSubjectsList = data; }
    );
    this.scheduleService.getSchedule(classId).subscribe(
      data => { this.scheduleData = data; },
      error => {
        this.scheduleData = new ScheduleData();
      }

    );
  }

  /**
   * Method gets the schedule for each day from the child component
   * @param event - Data for the daily schedule
   * @param dailySubjectsName - Daily schedule name
   */
  onAddDailySubjects(event: FormArray, dailySubjectsName: string): void {
    this.emittedDays[dailySubjectsName] = event;
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

    Object.keys(this.emittedDays).forEach(dailySubjectsName => {
      const dailyData = this.addDailyData(dailySubjectsName);
      if (!dailyData) {
        this.hasEmptyDay = true;
        this.messageClass = 'error-msg';
        this.showMessage('Заповніть розклад для всіх робочих днів');
        return;
      }
      this.scheduleData[dailySubjectsName] = dailyData;
    });

    if (!this.hasEmptyDay) {
      this.saveSchedule(this.frmSchedule.controls.selectClass.value.id, this.scheduleData);
    }
    this.hasEmptyDay = false;
  }

  /**
   * The method generates data for the daily schedule
   * @param dailySubjectsName - Daily schedule name
   * @returns - Data for the daily schedule
   */
  private addDailyData(dailySubjectsName: string): LessonData[] | boolean {
    const dailyLesson: LessonData[] = [];
    for (let i = 0; i < (this.emittedDays[dailySubjectsName].value.length); i++) {
      if (this.emittedDays[dailySubjectsName].value[i].firstGroup !== '') {
        dailyLesson.push({
          lessonNumber: `${i + 1}`,
          subjectId: this.emittedDays[dailySubjectsName].value[i].firstGroup.subjectId,
          subjectName: this.emittedDays[dailySubjectsName].value[i].firstGroup.subjectName,
          subjectDescription: this.emittedDays[dailySubjectsName].value[i].firstGroup.subjectDescription
        });
      }

      if ('secondGroup' in this.emittedDays[dailySubjectsName].value[i]) {
        if (this.emittedDays[dailySubjectsName].value[i].secondGroup !== '') {
          dailyLesson.push({
            lessonNumber: `${i + 1}`,
            subjectId: this.emittedDays[dailySubjectsName].value[i].secondGroup.subjectId,
            subjectName: this.emittedDays[dailySubjectsName].value[i].secondGroup.subjectName,
            subjectDescription: this.emittedDays[dailySubjectsName].value[i].secondGroup.subjectDescription
          });
        }
      }
    }
    if (dailyLesson.length === 0 && dailySubjectsName !== 'saturdaySubjects') {
      return false;
    }
    return dailyLesson;
  }

  /**
   * Method saves schedule for the class by id
   * @param classId - Id of class
   * @param data - Array with schedule data
   */
  private saveSchedule(classId: number, scheduleData: ScheduleData): void {
    this.scheduleService.saveSchedule(classId, scheduleData).subscribe(
        (data: ScheduleData) => {
          this.messageClass = 'success-msg';
          this.showMessage('Розклад успішно збережено');
          console.log(data); // for test
        }
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
