import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { SubjectData } from '../../../models/subject-data';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit, AfterViewChecked {

  @Input() legendDay: string;
  frmDailySchedule: FormGroup;

  private _arrSubjectsList: SubjectData[];
  @Input()
  set arrSubjectsList(inpSubjectsList: SubjectData[]) {
    this._arrSubjectsList = inpSubjectsList;
  }
  get arrSubjectsList(): SubjectData[] {
    return this._arrSubjectsList;
  }
  @Output() dayFilled: EventEmitter<any> = new EventEmitter();

  constructor(private frmBld: FormBuilder) {}

  ngOnInit() {
    this.buildDailySchedul();
  }

  /** Method initializes the initial state of the component's template */
  buildDailySchedul() {
    this.frmDailySchedule = this.frmBld.group({
      dailySchedule: this.frmBld.array([
        this.frmBld.group({
          firstGroup: this.frmBld.control(''),
          secondGroup: this.frmBld.control({value: '', disabled: true}),
        })
      ])
    });
  }
  //getter for the property of element ????
  get dailySchedule() {
    return this.frmDailySchedule.get('dailySchedule') as FormArray;
  }

  /**
   * Method dynamically adds the subject to the daily schedule
   * if the click was on the last element
   * @param i - Index of the element on which the click occurred
   */
  public addSubjest(i: number): void {
    if(i == (this.dailySchedule.length - 1)) {
      this.dailySchedule.push(this.frmBld.group({
        firstGroup: this.frmBld.control(''),
        secondGroup: this.frmBld.control({value: '', disabled: true})
      }));
    }
  }

  /**
   * Method makes available to fill the subject for second group
   * @param i - Index of the element which needs the second group
   */
  public addSecondGroup(i: number): void {
    this.dailySchedule.at(i).get('secondGroup').enable();
  }

  /**
   * Method removes the subject from the daily schedule
   * @param i - index of the control which to be deleted
   */
  public removeSubjest(i: number): void {
    if (this.dailySchedule.at(i).get('secondGroup').status != 'DISABLED') {
      const secondGroupCntrl: any = this.dailySchedule.at(i).get('secondGroup');
      secondGroupCntrl.setValue('');
      secondGroupCntrl.disable();
    } else {
      this.dailySchedule.removeAt(i);
    }
  }

  ngAfterViewInit(): void {
      //console.log('ngAfterViewInit - child');


    }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    //console.log('ngAfterViewChecked - child');
    this.dayFilled.emit(this.frmDailySchedule.value);
  }



}
