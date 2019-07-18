import { Component, OnInit } from '@angular/core';
import { StudentBookService } from '../../services/student-book.service';
import { MatChip } from '@angular/material/chips';
import * as _moment from 'moment';
const moment = _moment;


@Component({
  selector: 'app-scores-report',
  templateUrl: './scores-report.component.html',
  styleUrls: ['./scores-report.component.scss']
})
export class ScoresReportComponent implements OnInit {
  marksGroupedBySubject;
  displayedSubjects = new Set();

  isEndOfYear = moment().valueOf() < moment(`${this.educationYear + 1}-06-01`).valueOf();
  startPickerValue = this.dateOfSemestStart;
  endPickerValue = (this.isEndOfYear) ? moment() : moment(`${this.educationYear + 1}-06-01`);
  endPickerMax = this.endPickerValue;
  startPickerMin = moment(`${this.educationYear}-09-01`);
  get endPickerMin() { return this.startPickerValue.clone().add(1, 'days'); }
  get startPickerMax() { return this.endPickerValue.clone().subtract(1, 'days'); }

  dateRangeFilters = [
    {name: 'Тиждень', value: this.endPickerValue.clone().subtract(1, 'week'), selected: false},
    {name: 'Місяць', value: this.endPickerValue.clone().subtract(1, 'month'), selected: false},
    {name: 'Семестр', value: this.startPickerValue, selected: true}
  ];
  isCustomDateRangeFilter = false;

  constructor(
    private studentBookService: StudentBookService
  ) { }

  ngOnInit() {
    this.getMarks();
  }

  /**
   *  Gets all scores and group them by the subject title
   */
  getMarks() {
    const startDate = moment(this.startPickerValue.format('YYYY-MM-DD'));
    const endDate = this.endPickerValue.format('YYYY-MM-DD');
    const daysToMonday = 1 - startDate.day();
    const mondayDate = startDate.add(daysToMonday, 'days').format('YYYY-MM-DD');
    this.studentBookService.getAllMarks(mondayDate, endDate).subscribe(
      result => {
        this.marksGroupedBySubject = result.reduce(
          (groupedMarks, mark) => {
            groupedMarks[mark.subjectName] = groupedMarks[mark.subjectName] || [];
            groupedMarks[mark.subjectName].push(mark);
            return groupedMarks;
          },
          Object.create(null)
        );
        Object.keys(this.marksGroupedBySubject).forEach(
          subject => this.displayedSubjects.add(subject)
        );
      }
    );
  }

  /**
   * Return start of current semestr
   */
  get dateOfSemestStart(): _moment.Moment {
    const curMonth = moment().month();
    const start = (curMonth < 12 && curMonth > 7) ? `${moment().year()}-09-01` : `${moment().year()}-01-14`;
    return moment(start);
  }

  /**
   * Return current educational year
   */
  get educationYear(): number {
    const curMonth = moment().month();
    const year = (curMonth < 12 && curMonth > 7) ? moment().year() : moment().year() - 1;
    return year;
  }

  /**
   * Changes start date of filtering range acording to selected filter
   */
  onChipClick(chip: MatChip) {
    this.startPickerValue = chip.value;
    chip.select();
    this.getMarks();
  }
}
