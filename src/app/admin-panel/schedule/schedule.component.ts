import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleData } from '../../models/schedule-data';
import { ClassData } from '../../models/class-data';
import { SubjectData } from '../../models/subject-data';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';
import { ScheduleService } from '../../services/schedule.service';

/*Monday Tuesday Wednesday Thursday Friday Saturday */

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  scheduleData: ScheduleData;
  statusResp:any;
  frmSchedule: FormGroup;
  arrClassList: Array<ClassData>;
  arrSubjectsList: Array<SubjectData>;
  selectClassMsg: string = "Виберіть клас";
  dateTermStartMsg: string = "Дата початку семестру";
  dateTermEndMsg: string = "Дата закінчення семестру";
  weekDayName: Array<string> = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота'];

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


  ngAfterViewInit(): void {
    //console.log('ngAfterViewInit - parent');


  }

  selectedClass(event: any) {

    this.scheduleService.getSchedule(event.value).subscribe(data => {
      this.statusResp = data;
    });
    console.log(this.statusResp);
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    //console.log('ngAfterViewChecked - parent');
  }

  dayFilledHandler($event): void {
    //console.log($event + "parent");
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
