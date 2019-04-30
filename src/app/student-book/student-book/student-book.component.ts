import { Component, OnInit } from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { saveAs} from 'file-saver';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.component.html',
  styleUrls: ['./student-book.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class StudentBookComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'lesson', 'homeWork', 'mark', 'note'];
  public value;
  public serverData;
  public groupArr;
  public pickerDate;
  public showMessage: boolean;
  public showTable: boolean;
  public gridViewSetter: boolean;
  public listViewSetter: boolean;
  public dateValue = moment();

  constructor(private studentBookService: StudentBookService) {
  }

  ngOnInit() {
    this.showSchedule();
    this.gridView();
  }

  /**
   * Method which works with button BackDate, substract 7 days from current date.
   */
  backDate() {
    this.dateValue = moment(this.dateValue.subtract(7, 'd').format('YYYY-MM-DD'));
    console.log(this.dateValue);
    this.showSchedule();
  }

  /**
   * Method which works with button ForwardDate, add 7 days from current date.
   */
  forwardDate() {
    this.dateValue = moment(this.dateValue.add(7, 'd').format('YYYY-MM-DD'));
    console.log(this.dateValue);
    this.showSchedule();
  }

  /**
   * Method which load schedule on the page
   */
  showSchedule() {
    this.pickerDate = moment(this.dateValue.format('YYYY-MM-DD')); // dateValue from datePicker
    console.log('pickerDate in showSchedule:' + this.pickerDate.format('YYYY-MM-DD'));
    this.studentBookService.getInputDate(this.pickerDate.format('YYYY-MM-DD')); // send date from datePicker to server
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result; // data from server
      console.log(this.serverData);
      if (this.serverData.length) {
        this.showMessage = false;
        this.showTable = true;
        // sort data from server by date
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

  /**
   * Method which gets image from server, creates link for downloading and saves image
   * @param id of the lesson
   */
  getFile(id) {
    this.studentBookService.getHomeworkFile(id).subscribe(result => {
      const linkDownloadFile = 'data:' + result.fileType + ';base64,' + result.fileData;
      const fileName = result.fileName;
      saveAs(linkDownloadFile, fileName);
    });
  }

  /**
   * Method which sets grid view on the table of student-book
   */
  gridView() {
    this.gridViewSetter = true;
    this.listViewSetter = false;
  }

  /**
   * Method which sets list view on the table of student-book
   */
  listView() {
    this.listViewSetter = true;
    this.gridViewSetter = false;
  }
}
