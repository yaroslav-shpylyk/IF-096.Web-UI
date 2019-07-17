import { Component, OnInit } from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { saveAs} from 'file-saver';
import * as _moment from 'moment';
import { SubjectAttachmentDialogComponent } from '../../shared/subject-attachment-dialog/subject-attachment-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HomeworkStorageService } from '../../services/homework-storage.service';

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
  public dateValue = this.getStartOfWeek(moment());


  constructor(private studentBookService: StudentBookService,
              private homeworkStorageService: HomeworkStorageService,
              private snackBar: MatSnackBar,
              public attachmentDialog: MatDialog) {
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
    this.showSchedule();
  }

  /**
   * Method which works with button ForwardDate, add 7 days from current date.
   */
  forwardDate() {
    this.dateValue = moment(this.dateValue.add(7, 'd').format('YYYY-MM-DD'));
    this.showSchedule();
  }

  /**
   * Method which load schedule on the page
   */
  showSchedule() {
    this.pickerDate = moment(this.dateValue.format('YYYY-MM-DD')); // dateValue from datePicker
    this.studentBookService.getInputDate(this.pickerDate.format('YYYY-MM-DD')); // send date from datePicker to server
    this.studentBookService.getStudentBook().subscribe(result => {
      this.serverData = result; // data from server
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

  public openAttachment(event: { preventDefault: () => void; }, id): void {
    event.preventDefault();
    this.homeworkStorageService.saveFile(id).subscribe(data => {
      this.attachmentDialog.open(SubjectAttachmentDialogComponent, {
        width: '97vw',
        height: '93vh',
        maxWidth: '97vw',
        maxHeight: '90vh',
        data
      });
    });
  }

  /**
   * Datepicker filter: disable non Mondays dates
   */
  mondayFilter = (d: _moment.Moment): boolean => {
    return d.day() === 1;
  }

  /**
   * Checks the datepicker value if there is a Monday and corrects it
   */
  checkDate() {
    if ( this.dateValue.day() !== 1 ) {
      this.dateValue = this.getStartOfWeek(this.dateValue);
      this.snackBar.open('Тиждень має починатись з понедіка', null, {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'popup-error'
      });
    }
    this.showSchedule();
  }

  /**
   * Method return date of Monday in current week
   * @param curDate - current title of class
   * @returns date of Monday
   */
  getStartOfWeek(curDate: _moment.Moment): _moment.Moment {
    const daysToMonday = 1 - curDate.day();
    return curDate.clone().add(daysToMonday, 'days');
  }
}
