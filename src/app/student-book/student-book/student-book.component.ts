import {Component, OnInit} from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import { StudentBookData } from 'src/app/models/student-book-data';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.component.html',
  styleUrls: ['./student-book.component.scss']
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
  public dateValue = new Date();

  constructor(private studentBookService: StudentBookService, private adapter: DateAdapter<any>) {
  }
  ngOnInit() {
    this.showSchedule();
  }

  backDate() {
    this.dateValue = new Date(this.dateValue.getTime() - (1000 * 60 * 60 * 24 * 7));
    console.log(this.dateValue);
    this.showSchedule();
  }
  forwardDate() {
    this.dateValue = new Date(this.dateValue.getTime() + (1000 * 60 * 60 * 24 * 7));
    console.log(this.dateValue);
    this.showSchedule();
  }

  showSchedule() {
    this.pickerDate = this.dateValue.toISOString().slice(0, 10);
    console.log(this.pickerDate);
    this.studentBookService.getInputDate(this.pickerDate);
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
    this.pickerDate = event.value.format('YYYY-MM-DD');
    this.dateValue = new Date(this.pickerDate.split('-'));
    console.log(this.dateValue);
    this.studentBookService.getInputDate(this.pickerDate);
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
