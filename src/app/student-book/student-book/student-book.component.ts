import {Component, OnInit} from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import { StudentBookData } from 'src/app/models/student-book-data';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';

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
  public date = new FormControl(new Date());

  constructor(private studentBookService: StudentBookService, private adapter: DateAdapter<any>) {
  }
  ngOnInit() {
  }
  /**
   * Method gets data from datePicker and send it to service
   * @param event from input
   */


  addEvent(event: any) {
    console.log(event.value.format('YYYY-MM-DD'));
    this.pickerDate = event.value.format('YYYY-MM-DD');
    this.studentBookService.getInputDate(this.pickerDate);
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result;
      console.log(this.serverData);
      this.groupArr = this.serverData.reduce((reducer, {date}) => {
        if (!reducer.some(o => o.date.toString() === date.toString())) {
          reducer.push({date, groupItem: this.serverData.filter(v => v.date.toString() === date.toString())});
        }
        return reducer;
      }, []);
    });
  }
}
