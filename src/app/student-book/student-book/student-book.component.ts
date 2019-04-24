import { Component, OnInit } from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import { StudentBookData } from 'src/app/models/student-book-data';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.component.html',
  styleUrls: ['./student-book.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class StudentBookComponent implements OnInit {
  public studentData: StudentBookData[];
  public displayedColumns: string[] = ['position', 'lesson', 'homeWork', 'mark', 'note'];

  constructor(private studentBookService: StudentBookService, private adapter: DateAdapter<any>) {
  }

  public value;
  public serverData;
  public groupArr;
  public pickerDate;

  /*groupArr = this.serverData.reduce((r, {date}) => {
    if (!r.some(o => o.date === date)) {
      r.push({date, dateItem: this.serverData.filter(v => v.date === date)});
    }
    return r;
  }, []);*/

  /*  array = [
      {
        group: [2018, 10, 15],
        homeWork: 'Домашнє завдання #70, #76',
        homeworkFileId: null,
        lessonId: 3068,
        lessonNumber: 1,
        mark: 0,
        note: '',
        subjectName: 'Математика'
      },
      {
        group: [2018, 10, 15],
        homeWork: 'Домашнє завдання #70, #76',
        homeworkFileId: null,
        lessonId: 3069,
        lessonNumber: 2,
        mark: 0,
        note: '',
        subjectName: 'Біологія'
      },
      {
        group: [2018, 10, 15],
        homeWork: 'Домашнє завдання #70, #76',
        homeworkFileId: null,
        lessonId: 3070,
        lessonNumber: 3,
        mark: 0,
        note: '',
        subjectName: 'Українська мова'
      },
      {
        group: [2018, 10, 16],
        homeWork: 'Домашнє завдання #70, #76',
        homeworkFileId: null,
        lessonId: 3070,
        lessonNumber: 1,
        mark: 0,
        note: '',
        subjectName: 'Українська мова'
      },
      {
        group: [2018, 10, 16],
        homeWork: 'Домашнє завдання #70, #76',
        homeworkFileId: null,
        lessonId: 3070,
        lessonNumber: 2,
        mark: 0,
        note: '',
        subjectName: 'Українська мова'
      },
      {
        group: [2018, 10, 17],
        homeWork: 'Домашнє завдання #70, #76',
        homeworkFileId: null,
        lessonId: 3070,
        lessonNumber: 1,
        mark: 0,
        note: '',
        subjectName: 'Українська мова'
      },
      {
        group: [2018, 10, 17],
        homeWork: 'Домашнє завдання #70, #76',
        homeworkFileId: null,
        lessonId: 3070,
        lessonNumber: 2,
        mark: 0,
        note: '',
        subjectName: 'Українська мова'
      }
    ];*/

  ngOnInit() {
  }

  /**
   * Method gets data from input and send it to service
   * @param value from input
   */
/*  onEnter(value: string) {
    this.value = value;
    console.log(value);
    this.studentBookService.getInputDate(this.value);
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result;
      console.log(this.serverData);
      this.groupArr = this.serverData.reduce((r, {date}) => {
        if (!r.some(o => o.date.toString() === date.toString())) {
          r.push({date, groupItem: this.serverData.filter(v => v.date.toString() === date.toString())});
        }
        return r;
      }, []);
    });
  }*/


  /*addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value.toISOString().slice(0, 10));
    this.pickerDate = event.value.toISOString().slice(0, 10);
    this.studentBookService.getInputDate(this.pickerDate);
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result;
      console.log(this.serverData);
      this.groupArr = this.serverData.reduce((r, {date}) => {
        if (!r.some(o => o.date.toString() === date.toString())) {
          r.push({date, groupItem: this.serverData.filter(v => v.date.toString() === date.toString())});
        }
        return r;
      }, []);
    });
  }*/

  addEvent(event: any) {
    console.log(event.value.format('YYYY-MM-DD'));
    this.pickerDate = event.value.format('YYYY-MM-DD');
    this.studentBookService.getInputDate(this.pickerDate);
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result;
      console.log(this.serverData);
      this.groupArr = this.serverData.reduce((r, {date}) => {
        if (!r.some(o => o.date.toString() === date.toString())) {
          r.push({date, groupItem: this.serverData.filter(v => v.date.toString() === date.toString())});
        }
        return r;
      }, []);
    });
  }
}
