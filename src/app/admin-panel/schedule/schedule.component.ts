import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ClassData } from '../../models/class-data';
import { SubjectData } from '../../models/subject-data';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

/*Понеділок Вівторок Середа Четвер П'ятниця Субота
Monday Tuesday Wednesday Thursday Friday Saturday */

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  frmSchedule: FormGroup;
  arrClassList: ClassData[] = [];
  arrSubjectsList: SubjectData[] = [];
  selectClassMsg: string;
  dateTermStartMsg: string;
  dateTermEndMsg: string;

  constructor(private frmBld: FormBuilder,
    private dataList: DataService) { }

  ngOnInit() {
    this.dataList.getData('/classes').subscribe(data => {
      this.arrClassList = data.filter(currentClass => currentClass.isActive);
    });
    this.dataList.getData('/subjects').subscribe(data => {
      this.arrSubjectsList = data;
    });
    this.initForm();
  }

  /** Method initializes the initial state of the form */
  initForm() {
    this.frmSchedule = this.frmBld.group({
      dateTermStart: [''],
      dateTermEnd: [''],
      selectedClass: ['', Validators.required],
      mondaySchedule: this.frmBld.array([
        this.frmBld.control('')
      ])



    });
    this.selectClassMsg = 'Виберіть клас';
    this.dateTermStartMsg = "Дата початку семестру";
    this.dateTermEndMsg = "Дата закінчення семестру";
  }

  get mondaySchedule() {
    return this.frmSchedule.get('mondaySchedule') as FormArray;
  }

  /** Method dynamically adds the subject to the day schedule */
  public addSubjest(): void {
    this.mondaySchedule.push(this.frmBld.control(''));
  }

  /** Method removes the subject from the day schedule
   * @param i - index of the control which to be deleted
   */
  public removeSubjest(i: number): void {
    this.mondaySchedule.removeAt(i);
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
