import {Component, OnInit } from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import { StudentBookData } from 'src/app/models/student-book-data';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.component.html',
  styleUrls: ['./student-book.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class StudentBookComponent implements OnInit {

  public studentData: StudentBookData[];
  public displayedColumns: string[] = ['position', 'lesson', 'homeWork', 'mark', 'note'];
  public value;
  public serverData;
  public groupArr;
  public pickerDate;
  public showMessage: boolean;
  public showTable: boolean;
  public dateValue = moment();

  constructor(private studentBookService: StudentBookService, private adapter: DateAdapter<any>) {
  }
  ngOnInit() {
    this.showSchedule();
  }

  backDate() {
    this.dateValue = moment(this.dateValue.subtract(7, 'd').format('YYYY-MM-DD'));
    console.log(this.dateValue);
    this.showSchedule();
  }
  forwardDate() {
    this.dateValue = moment(this.dateValue.add(7, 'd').format('YYYY-MM-DD'));
    console.log(this.dateValue);
    this.showSchedule();
  }

  showSchedule() {
    this.pickerDate = moment(this.dateValue.format('YYYY-MM-DD'));
    console.log('pickerDate in showSchedule:' + this.pickerDate.format('YYYY-MM-DD'));
    this.studentBookService.getInputDate(this.pickerDate.format('YYYY-MM-DD'));
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result;
      console.log(this.serverData);
      if (this.serverData.length) {
        this.showMessage = false;
        this.showTable = true;
        this.groupArr = this.serverData.reduce((reducer, {date}) => {
          if (!reducer.some(i => i.date.toString() === date.toString())) {
            reducer.push({date, groupItem: this.serverData.filter(value => value.date.toString() === date.toString())});
          }
          return reducer;
        }, []);
      } else {
        this.showMessage = true;
        this.showTable = false;
      }
    });
  }

  getDatePicker(event: any) {
    this.dateValue = moment(event.value.format('YYYY-MM-DD'));
    this.pickerDate = this.dateValue;
    console.log(this.pickerDate);
    this.studentBookService.getInputDate(this.pickerDate.format('YYYY-MM-DD'));
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result;
      console.log(this.serverData);
      if (this.serverData.length) {
        this.showMessage = false;
        this.showTable = true;
        this.groupArr = this.serverData.reduce((reducer, {date}) => {
          if (!reducer.some(i => i.date.toString() === date.toString())) {
            reducer.push({date, groupItem: this.serverData.filter(value => value.date.toString() === date.toString())});
          }
          return reducer;
        }, []);
      } else {
        this.showMessage = true;
        this.showTable = false;
      }
    });
  }
}
