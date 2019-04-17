import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleData } from '../../models/schedule-data';
import { ClassData } from '../../models/class-data';
import { SubjectData } from '../../models/subject-data';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleData: ScheduleData;

  /*mondaySubjects: LessonData[];
    lessonNumber: string;
    subjectId: number;
    subjectName: string;
    subjectDescription: string*/

  frmSchedule: FormGroup;
  arrClassList: Array<ClassData>;
  arrSubjectsList: Array<SubjectData>;
  selectClassMsg = 'Виберіть клас*';
  dateTermStartMsg = 'Дата початку семестру*';
  dateTermEndMsg = 'Дата закінчення семестру*';

  weekDayName: Array<{legendDay: string, dailySubjects: string}> = [
    {legendDay: 'Понеділок', dailySubjects: 'mondaySubjects'},
    {legendDay: 'Вівторок', dailySubjects: 'tuesdaySubjects'},
    {legendDay: 'Середа', dailySubjects: 'wednesdaySubjects'},
    {legendDay: 'Четвер', dailySubjects: 'thursdaySubjects'},
    {legendDay: 'П`ятниця', dailySubjects: 'fridaySubjects'},
    {legendDay: 'Субота', dailySubjects: 'saturdaySubjects'}
  ];

  emittedMondaySubjects: any;
  emittedTuesdaySubjects: any;
  emittedWednesdaySubjects: any;
  emittedThursdaySubjects: any;
  emittedFridaySubjects: any;
  emittedSaturdaySubjects: any;

  constructor(private frmBld: FormBuilder,
    private classService: ClassService,
    private subjectsService: SubjectService,
    private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.classService.getClasses('active').subscribe(data => {
      this.arrClassList = data;
    });
    this.subjectsService.getSubjects().subscribe(data => {
      this.arrSubjectsList = data;
    });
    this.initForm();
  }

  /** Method initializes the initial state of the form */
  initForm() {
    this.frmSchedule = this.frmBld.group({
      dateTermStart: [''],
      dateTermEnd: [''],
      selectClass: ['', Validators.required]
    });
  }

  /**
   * Method gets schedule for selected class
   * @param classId - Id of selected class
   * @returns - Schedule for selected class
   */
  selectedClass(classId: number) {
    this.scheduleService.getSchedule(classId).subscribe(data => {
      this.scheduleData = data;

      console.log(this.scheduleData); //for test

    });
  }

  onAddDailySubjects($event, dailySubjects: string): void {
    switch (dailySubjects) {
      case 'mondaySubjects' : {
        this.emittedMondaySubjects = $event;
      }
      case 'tuesdaySubjects' : {
        this.emittedTuesdaySubjects = $event;
      }
      case 'wednesdaySubjects' : {
        this.emittedWednesdaySubjects = $event;
      }
      case 'thursdaySubjects' : {
        this.emittedThursdaySubjects = $event;
      }
      case 'fridaySubjects' : {
        this.emittedFridaySubjects = $event;
      }
      case 'saturdaySubjects' : {
        this.emittedSaturdaySubjects = $event;
      }
    }
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
   * The method checks the form for validity and then handle form data
   */
  onSubmit() {
    const controls = this.frmSchedule.controls;
    /* Check the form for validity */
    if (this.frmSchedule.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched() );
      return;
    }
    /* Handling form data */

    console.log(this.emittedWednesdaySubjects.value); //for test

    /*const lessonData: LessonData = {
      lessonNumber: ,
      subjectId: ,
      subjectName: ,
      subjectDescription:
    };*/
  }
}
