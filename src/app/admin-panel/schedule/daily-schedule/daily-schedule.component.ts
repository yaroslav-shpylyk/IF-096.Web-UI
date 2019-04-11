import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubjectData } from '../../../models/subject-data';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit {

  //@Input()
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  childDailySchedule: FormGroup;
  arrSubjectsList: SubjectData[];
  secondGroupMsg: string;

  constructor(private frmBld: FormBuilder, private dataList: DataService) { }

  ngOnInit() {
    this.dataList.getData('/subjects').subscribe(data => {
      this.arrSubjectsList = data;
    });

    this.buildDailySchedul();
  }

  buildDailySchedul() {
    this.childDailySchedule = this.frmBld.group({
      lessons: this.frmBld.array([
        this.frmBld.group({
          firstGroup: this.frmBld.control(''),
          secondGroup: this.frmBld.control({value: '', disabled: true}),
        })
      ])
    });

    this.secondGroupMsg = "Виберіть предмет";
  }

  get lessons() {
    return this.childDailySchedule.get('lessons') as FormArray;
  }

  /**
   * Method dynamically adds the subject to the daily schedule
   * if the click was on the last element
   * @param i - Index of the element on which the click occurred
   */
  public addSubjest(i: number): void {
    if(i == (this.lessons.length - 1)) {
      this.lessons.push(this.frmBld.group({
        firstGroup: this.frmBld.control(''),
        secondGroup: this.frmBld.control({value: '', disabled: true})
      }));
    }

    //this.renderer.addClass(this.buttonAdd.nativeElement, 'nameclass');
    //console.log(i + " " + this.buttonAdd.nativeElement);
  }

  /**
   * Method makes available to fill the subject for second group
   * @param i - Index of the element which needs the second group
   */
  public addSecondGroup(i: number): void {
    this.lessons.at(i).get('secondGroup').enable();
  }

  /**
   * Method removes the subject from the daily schedule
   * @param i - index of the control which to be deleted
   */
  public removeSubjest(i: number): void {
    if (this.lessons.at(i).get('secondGroup').status != 'DISABLED') {
      const secondGroupCntrl: any = this.lessons.at(i).get('secondGroup');
      secondGroupCntrl.setValue('');
      secondGroupCntrl.disable();
    } else {
      this.lessons.removeAt(i);
    }
  }

  sendMessage(data) {
    this.dataChanged.emit(this.childDailySchedule.value);
  }

}
