import { Component, OnInit } from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import * as _moment from 'moment';
const moment = _moment;


@Component({
  selector: 'app-scores-report',
  templateUrl: './scores-report.component.html',
  styleUrls: ['./scores-report.component.scss']
})
export class ScoresReportComponent implements OnInit {

  marksGroupedBySubject;
  displayedSubjects;
  pickerDate;

  constructor(
    private studentBookService: StudentBookService
  ) { }

  ngOnInit() {
    this.getMarks();
  }

  getMarks() {
    this.pickerDate = moment('2019-01-13');
    const daysToMonday = 1 - this.pickerDate.day();
    const mondayDate = this.pickerDate.add(daysToMonday, 'days').format('YYYY-MM-DD');
    this.studentBookService.getAllMarks(mondayDate).subscribe(
      result => {
        this.marksGroupedBySubject = result.reduce(
          (groupedMarks, mark) => {
            groupedMarks[mark.subjectName] = groupedMarks[mark.subjectName] || [];
            groupedMarks[mark.subjectName].push(mark);
            return groupedMarks;
          },
          Object.create(null)
        );
        this.displayedSubjects = new Set(Object.keys(this.marksGroupedBySubject));
      }
    );
  }
}
