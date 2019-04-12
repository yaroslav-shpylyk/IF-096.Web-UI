import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { ClassData } from '../../models/class-data';
import { SubjectData } from '../../models/subject-data';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';

/*Monday Tuesday Wednesday Thursday Friday Saturday */

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  frmSchedule: FormGroup;
  arrClassList: Array<ClassData> = [];
  arrSubjectsList: Array<SubjectData> = [];
  selectClassMsg: string = "Виберіть клас";
  dateTermStartMsg: string = "Дата початку семестру";
  dateTermEndMsg: string = "Дата закінчення семестру";
  weekDayName: Array<string> = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота'];

  constructor(private frmBld: FormBuilder,
    private classList: ClassService,
    private subjectsList: SubjectService) { }

  ngOnInit() {
    this.classList.getClasses('active').subscribe(data => {
      this.arrClassList = data;
    });
    this.subjectsList.getSubjects().subscribe(data => {
      this.arrSubjectsList = data;
    });

    this.initForm();
  }

  /** Method initializes the initial state of the form */
  initForm() {
    this.frmSchedule = this.frmBld.group({
      dateTermStart: [''],
      dateTermEnd: [''],
      selectedClass: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    //console.log(this.parentDailySchedule);


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

    console.log(this.frmSchedule.value);
   
  }
}
