import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ClassData } from '../../models/class-data';
import { SubjectData } from '../../models/subject-data';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

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

  @ViewChild("buttonAdd")
  buttonAdd: ElementRef;

  constructor(private frmBld: FormBuilder,
    private dataList: DataService, private renderer: Renderer2) { }

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
        this.frmBld.group({
          firstGroup: this.frmBld.control(''),
          secondGroup: this.frmBld.control('')
        })
      ])
    });
    this.selectClassMsg = 'Виберіть клас';
    this.dateTermStartMsg = "Дата початку семестру";
    this.dateTermEndMsg = "Дата закінчення семестру";
  }

  get mondaySchedule() {
    return this.frmSchedule.get('mondaySchedule') as FormArray;
  }

  /**
   * Method dynamically adds the subject to the daily schedule
   * if the click was on the last element
   * @param i - Index of the element on which the click occurred
   */
  public addSubjest(i: number): void {
    if(i == (this.mondaySchedule.length - 1)) {
      this.mondaySchedule.push(this.frmBld.group({
        firstGroup: this.frmBld.control(''),
        secondGroup: this.frmBld.control('')
      }));
    }

    //this.renderer.addClass(this.buttonAdd.nativeElement, 'nameclass');
    console.log(i + " " + this.buttonAdd.nativeElement);
  }

  /**
   * Method dynamically adds the subject to the daily schedule for second group
   * @param i - Index of the element which needs the second group
   */
  public addSecondGroup(i: number): void {
    //console.log(i + " " + this.mondaySchedule[i].secondGroup.value);
  }

  /**
   * Method removes the subject from the daily schedule
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
